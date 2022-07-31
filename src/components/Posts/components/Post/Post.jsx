import React from "react";
import userPhoto from "../../../../assets/images/user-icon.png";

export const Post = ({ question_id, title, owner, link }) => {
    // отрисовка одного поста
    return (
        <div>
            <li key={question_id}>
                <img src={owner.profile_image != null ? owner.profile_image : userPhoto} />
                <a href={link} target="_blank">{title}</a>
            </li>
        </div>
    );
};