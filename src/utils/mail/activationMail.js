module.exports = activationMail = (name, url, CONTACT_US, date) => {
    return `
        <div>
            <div style=" background: #005CE4; width:100%;">
                <div style=" padding: 20px 5px; ">
                    <div>
                        <div style=" text-align: center; padding: 0 0 10px; ">
                            <h1 style="color: #fff;">School Software</h1>
                        </div>
                        <div>
                            <div style="background: #fff;
                            padding: 10px 20px;
                            border-radius: 10px;
                            margin: 5px;
                            text-align: center;">
                                <div>
                                    <h2>Welcome To School Software</h2>
                                    <hr />
                                    <h3>${name},</h3>
                                    <br />
                                    Congratulations! You're almost set to start using this application.
                                    <br>
                                    Just click the button below to verify your email address.
                                    <div>
                                        <div style="text-align: -webkit-center;" >
                                        <a href=${url}
                                            style="font-family: Helvetica,Arial,Helvetica,sans-serif;
                                            font-weight: bold;
                                            padding: 10px;
                                            color: #fff;
                                            text-decoration: none;
                                            display: block;
                                            background: #005ce4;
                                            width: 240px;
                                            border-radius: 10px;
                                            margin: 10px;"
                                        >
                                            Verified Email Address
                                        </a>
                                        </div>
                                    </div>
                                    <div style="padding: 0 20px;">
                                        <br>
                                        <div>
                                            If the button does not work for any reason, you
                                            can also paste the following into your browser:
                                            <a href=${url}>${url}</a>
                                        </div>
                                        <br>
                                        <div>
                                            Note: You must perform this validation within the next 10 minute to keep your new
                                            account enabled.
                                            <br>
                                            <br>
                                            If you encounter any problem, please contact us at<div> ${CONTACT_US}</div>
                                        </div>
                                        <br/>
                                        <div style="text-align: end;">
                                            ${date}
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
