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

export const getGroupName = (mode, usersDetails, user) => {

    const members = usersDetails.filter(det => det.isPresent) //if a user isPresent is false then don't render it

    const membersMinusUser = members.filter((member, memberIndex) => member.userId !== user?.id).map(item => item.username); 
    const displayLimit = mode == 'chatList' ? 2 : 4

    const more = (membersMinusUser.length - displayLimit > 0) ? `+${membersMinusUser.length - displayLimit}` : '';

    const truncateValue = more ? 11 : 14

    const name = mode == 'chatList'
                    ?membersMinusUser.filter((member, memberIndex) => memberIndex < displayLimit).join(', ').substring(0, truncateValue)
                    :membersMinusUser.filter((member, memberIndex) => memberIndex < displayLimit).join(', ')

    const finalName = more && mode == 'chatList' ? name + '...' : name

    // console.log('e b tings', {usersDetails, members, membersMinusUser, more, truncateValue, name, finalName} )

    return {
        name: finalName,
        more
    }
}


// export const checkIfGroupNameChanged = (initialName, groupName) => {
//     console.log('INITIAL NAME', initialName, 'GROUP NAME', groupName)
//     return initialName == groupName ? false : true;
// }