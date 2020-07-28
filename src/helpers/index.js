export const getProfileCompletion = (user) => {
    const profileKeys = [
        'profileImage' ,'firstName', 'lastName', 'username', 'phoneNumber', 'DateOfBirth',
        'gender', 'maritalStatus', 'personality_type', 'occupation', 'reference',
        'experience', 'availableDays', 'availableTime', 'charity', 'topics'
    ]

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