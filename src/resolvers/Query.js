const { getUserId } = require('../utils')

function articles(root, args, context, info) {
    const userId = getUserId(context)
    return context.db.query.articles({ where: { postedBy: { id: userId }}}, info)
}

async function article(root, args, context, info) {
    const userId = getUserId(context)
    const result = await context.db.query.article({ where: { id: args.id }}, ` { postedBy { id } } `)

    if (!result.postedBy || userId !== result.postedBy.id)
        throw new Error('Wrong user')

    return context.db.query.article({ where: { id: args.id }}, info)
}

module.exports = {
    articles,
    article
}