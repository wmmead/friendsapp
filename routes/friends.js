const express = require('express');
const router = express.Router();
const Parse = require('parse/node');

// ================================================
// GET /api/friends
// Fetch and return all friends sorted by last name
// ================================================
router.get('/', async (req, res) => {
    const Friend = Parse.Object.extend('friends');
    const query = new Parse.Query(Friend);

    try {
        const results = await query.ascending('lname').find();

        // Map raw Parse results into plain JavaScript objects
        const friends = results.map(friend => ({
            id: friend.id,
            lname: friend.get('lname'),
            fname: friend.get('fname'),
            email: friend.get('email'),
            facebook: friend.get('facebook'),
            twitter: friend.get('twitter'),
            instagram: friend.get('instagram'),
            linkedin: friend.get('linkedin'),
        }));

        res.json(friends);
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ error: 'Failed to fetch friends' });
    }
});

// ==========================================================
// GET /api/friends/:id
// Fetch and return a single friend record by its Parse ID
// ==========================================================
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const Friend = Parse.Object.extend('friends');
    const query = new Parse.Query(Friend);

    try {
        const friend = await query.get(id);

        res.json({
            id: friend.id,
            fname: friend.get('fname'),
            lname: friend.get('lname'),
            email: friend.get('email'),
            facebook: friend.get('facebook'),
            twitter: friend.get('twitter'),
            instagram: friend.get('instagram'),
            linkedin: friend.get('linkedin'),
        });
    } catch (error) {
        console.error('Error fetching friend:', error);
        res.status(500).json({ error: 'Failed to fetch friend' });
    }
});

// ========================================
// POST /api/friends
// Create a new friend record in Back4App
// ========================================
router.post('/', async (req, res) => {
    const { fname, lname, email, facebook, twitter, instagram, linkedin } = req.body;

    // Validate required fields
    if (!fname || !lname || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const Friend = Parse.Object.extend('friends');
    const newFriend = new Friend();

    // Set the fields from request body
    newFriend.set('fname', fname);
    newFriend.set('lname', lname);
    newFriend.set('email', email);
    newFriend.set('facebook', facebook || '');
    newFriend.set('twitter', twitter || '');
    newFriend.set('instagram', instagram || '');
    newFriend.set('linkedin', linkedin || '');

    try {
        const result = await newFriend.save();
        res.status(201).json({ message: 'Friend created', id: result.id });
    } catch (error) {
        console.error('Error creating friend:', error);
        res.status(500).json({ error: 'Failed to create friend' });
    }
});

// =============================================
// PUT /api/friends/:id
// Update an existing friend record by its ID
// =============================================
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, facebook, twitter, instagram, linkedin } = req.body;

    const Friend = Parse.Object.extend('friends');
    const query = new Parse.Query(Friend);

    try {
        const friend = await query.get(id);

        // Update the fields with new values
        friend.set('fname', fname);
        friend.set('lname', lname);
        friend.set('email', email);
        friend.set('facebook', facebook || '');
        friend.set('twitter', twitter || '');
        friend.set('instagram', instagram || '');
        friend.set('linkedin', linkedin || '');

        const updatedFriend = await friend.save();
        res.json({ message: 'Friend updated', id: updatedFriend.id });
    } catch (error) {
        console.error('Error updating friend:', error);
        res.status(500).json({ error: 'Failed to update friend' });
    }
});

// =======================================================
// DELETE /api/friends/:id
// Delete a specific friend record by its Parse object ID
// =======================================================
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const Friend = Parse.Object.extend('friends');
    const query = new Parse.Query(Friend);

    try {
        const object = await query.get(id);
        await object.destroy(); // Permanently deletes the record
        res.status(200).json({ message: 'Friend deleted successfully' });
    } catch (error) {
        console.error('Error deleting friend:', error);
        res.status(500).json({ error: 'Failed to delete friend' });
    }
});

// Export the router to be used in the main server file
module.exports = router;