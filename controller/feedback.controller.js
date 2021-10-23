const db = require('../db')

class feedbackController {

    async createFeedback(req, res) {
        const { name, email, message } = req.body
        const newFeedback = await db.query(
            `INSERT INTO feedback (name, email, message) values ($1, $2, $3) RETURNING *`,
            [name, email, message]
        )

        res.json(newFeedback.rows[0])
    }

    async getFeedbacks(req, res) {
        const feedbacks = await db.query('SELECT * FROM feedback')
        res.json(feedbacks.rows)
    }

    async getOneFeedback(req, res) {
        const id = req.params.id
        const feedback = await db.query('SELECT * FROM feedback where id = $1', [id])
        res.json(feedback.rows[0])
    }

    async updateFeedback(req, res) {
        const { id, name, email, message } = req.body
        const feedback = await db.query(
            'UPDATE feedback set name = $1, email = $2, message = $3 where id = $4 RETURNING *',
            [name, email, message, id]
        )
        res.json(feedback.rows[0])
    }

    async deleteFeedback(req, res) {
        const id = req.params.id
        const feedback = await db.query('DELETE FROM feedback where id = $1', [id])
        res.json(feedback.rows[0])
    }
}

module.exports = new feedbackController()