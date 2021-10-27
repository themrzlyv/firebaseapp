import React from 'react';

interface iProps {
}

const Profile:React.FC<iProps> = (): JSX.Element => {
    console.log('profile')
    return (
        <div>
            <h2>profile</h2>
        </div>
    );
}

export default Profile;