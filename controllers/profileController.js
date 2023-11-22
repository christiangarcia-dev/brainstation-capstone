// profile controller 
const getUserProfile = (req, res) => {
    // TODO: retrieve user profile information from the database
    res.status(200).json({ message: "User profile retrieved" });
};

const updateUserProfile = (req, res) => {
    // TODO: update user profile information in the database
    res.status(200).json({ message: "User profile updated" });
};

module.exports = {
    getUserProfile,
    updateUserProfile
};
