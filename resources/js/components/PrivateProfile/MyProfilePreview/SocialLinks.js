import React from "react";

const SocialLinks = ({ profileData }) => {
    const appUrl = process.env.MIX_APP_URL;

    return (
        <>
            {profileData ? (
                <div className="d-flex justify-content-between">
                    {profileData.twitch && (
                        <a
                            href={`https://www.twitch.tv/${profileData.twitch}`}
                            target="_blank"
                            className={`private-profile-preview-social-links-${profileData.profile_color}`}
                        >
                            <img
                                src={`${appUrl}/images/twitch.png`}
                                alt="twitch link"
                                className="privacy-icon mr-2"
                            />
                            <span>Twitch</span>
                        </a>
                    )}{" "}
                    {profileData.twitter && (
                        <a
                            href={`https://twitter.com/${profileData.twitter}`}
                            target="_blank"
                            className={`private-profile-preview-social-links-${profileData.profile_color}`}
                        >
                            <img
                                src={`${appUrl}/images/twitter.png`}
                                alt="twitter link"
                                className="privacy-icon mr-2"
                            />
                            <span>Twitter</span>
                        </a>
                    )}{" "}
                    {profileData.instagram && (
                        <a
                            href={`https://www.instagram.com/${profileData.instagram}`}
                            target="_blank"
                            className={`private-profile-preview-social-links-${profileData.profile_color}`}
                        >
                            <img
                                src={`${appUrl}/images/instagram.png`}
                                alt="instagram link"
                                className="privacy-icon mr-2"
                            />
                            <span>Instagram</span>
                        </a>
                    )}{" "}
                    {profileData.youtube && (
                        <a
                            href={`https://www.youtube.com/c/${profileData.youtube}`}
                            target="_blank"
                            className={`private-profile-preview-social-links-${profileData.profile_color}`}
                        >
                            <img
                                src={`${appUrl}/images/youtube.png`}
                                alt="youtube link"
                                className="privacy-icon mr-2"
                            />
                            <span>Youtube</span>
                        </a>
                    )}{" "}
                </div>
            ) : null}
        </>
    );
};

export default SocialLinks;
