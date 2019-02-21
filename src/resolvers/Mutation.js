const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.db.mutation.createUser({
        data: {...args, password},
    }, `{ id }`)

    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.db.query.user(
        { where: { username: args.username } },
        ` { id password } `
    )
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // TODO: Faire auth par cookie.
    // context.response.cookie('jwt', `${token}`)

    return {
        token,
        user,
    }
}

function createArticle(root, args, context, info) {
    const userId = getUserId(context)
    return context.db.mutation.createArticle(
        {
            data: {
                title: args.title,
                body: args.body,
                postedBy: { connect: { id: userId } },
            },
        },
        info,
    )
}

async function deleteArticle(root, args, context, info) {

    const userId = getUserId(context)
    const result = await context.db.query.article({ where: { id: args.id }}, ` { postedBy { id } } `)

    if (!result.postedBy || userId !== result.postedBy.id)
        throw new Error('Wrong user')

    return context.db.mutation.deleteArticle(
        {
            where: {
                id: args.id,
            }
        },
        info,
    )
}

module.exports = {
    signup,
    login,
    createArticle,
    deleteArticle,
}