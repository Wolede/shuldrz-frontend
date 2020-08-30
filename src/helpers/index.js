export const getProfileCompletion = (user) => {
    const volunteerProfileKeys = [
        'profileImage' ,'firstName', 'lastName', 'username', 'phoneNumber', 'DateOfBirth',
        'gender', 'maritalStatus', 'personality_type', 'occupation',
        'experience', 'availableDays', 'availableTime', 'charity', 'topics'
    ]

    const guestProfileKeys = [
        'profileImage' ,'firstName', 'lastName', 'username', 'phoneNumber', 'DateOfBirth',
        'gender', 'maritalStatus', 'personality_type', 'occupation',
        'experience', 'availableDays', 'availableTime', 'topics'
    ]

    const profileKeys = user.userType === 'Volunteer' ? volunteerProfileKeys : guestProfileKeys;

    //handle empty array for calculation.

    const profileScore = profileKeys.reduce((acc, curr) => {
        if (user){
            if(Array.isArray(user[curr]) && user[curr].length > 0){
                acc += 1
            } else if (!Array.isArray(user[curr]) && user[curr]) {
                acc += 1
            }
        }
        return acc
    }, 0)

    const profilePercentage = `${Math.round((profileScore / profileKeys.length) * 100)}%`

    return profilePercentage
}