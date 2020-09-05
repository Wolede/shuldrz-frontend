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

export const getGroupName = (mode, usersDetails) => {

    const members = usersDetails.filter(det => det.isPresent).map(item => item.username) //if a user isPresent is false then don't render it

    const displayLimit = mode == 'chatList' ? 2 : 3

    const membersMinusUser = members.filter((member, memberIndex) => memberIndex < members.length - 1); //it's assumed the user will always be the last entry in the array

    const more = (membersMinusUser.length - displayLimit) ? `+${membersMinusUser.length - displayLimit}` : '';

    const truncateValue = more ? 11 : 14

    const name = mode == 'chatList'
                    ?membersMinusUser.filter((member, memberIndex) => memberIndex < displayLimit).join(', ').substring(0, truncateValue)
                    :membersMinusUser.filter((member, memberIndex) => memberIndex < displayLimit).join(', ')

    const finalName = more && mode == 'chatList' ? name + '...' : name

    return {
        name: finalName,
        more
    }
}