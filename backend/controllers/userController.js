
import sql from '../configs/db.js';

// Return all creations for the current user
export const getUserCreations = async (req, res) => {
    try {
        const authRes = await req.auth?.();
        const userId = authRes?.userId ?? req.userId;
        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
        return res.json({ success: true, creations });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Toggle like on a creation
export const toggleLikeCreations = async (req, res) => {
    try {
        const authRes = await req.auth?.();
        const userId = authRes?.userId ?? req.userId;
        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

        const { id } = req.body ?? {};
        if (!id) return res.json({ success: false, message: 'Missing creation id' });

        const creationRows = await sql`SELECT * FROM creations WHERE id = ${id} LIMIT 1`;
        const creation = creationRows?.[0];
        if (!creation) {
            return res.json({ success: false, message: 'Creation not found' });
        }

        const currentLikes = Array.isArray(creation.likes) ? creation.likes : (creation.likes ? creation.likes.split(',') : []);
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;
        if (currentLikes.includes(userIdStr)) {
            updatedLikes = currentLikes.filter((user) => user !== userIdStr);
            message = 'Creation Unliked';
        } else {
            updatedLikes = [...currentLikes, userIdStr];
            message = 'Creation Liked';
        }

        // Store as Postgres array literal if needed
        const formattedArray = `{${updatedLikes.join(',')}}`;
        await sql`UPDATE creations SET likes = ${formattedArray} WHERE id = ${id}`;

        return res.json({ success: true, message, likes: updatedLikes });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}