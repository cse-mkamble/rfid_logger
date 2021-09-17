module.exports = resetPasswordMail = (url) => {
    return `
        <div>
            <div style=" background: #005CE4; width:100%;">
                <div style=" padding: 20px 5px; ">
                    <div>
                        <div style=" text-align: center; padding: 0 0 10px; ">
                            <h1 style="color: #fff;">School Software</h1>
                        </div>
                        <div>
                            <div style="background: #f7f7f7;
                            padding: 10px 20px;
                            border-radius: 10px;
                            margin: 5px;
                            text-align: center;">
                                <div>
                                    <br />
                                    <div
                                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:12px;line-height:18px;padding-left:0;padding-right:0;padding:20px 20px 0px;font:500 16px/22px Arial,Helvetica,sans-serif,Fira">
                                        <h3>Your password has been reset successfully.</h3>
                                    </div>
                                    <br />
                                    <div>
                                        <img alt=""
                                            src="https://res.cloudinary.com/aztec/image/upload/v1629035378/nutmeg_zamcfr.gif"
                                            style=" width: 300px; " />
                                    </div>
                                    <div
                                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:12px;line-height:18px;padding-left:0;padding-right:0;padding:20px 20px 0px;font:500 16px/22px Arial,Helvetica,sans-serif,Fira">
                                        <br>
                                        Just click the button below to Login School Software :
                                    </div>
                                    <div>
                                        <div style="text-align: -webkit-center;">
                                            <a href=""
                                                style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-weight:bold;padding:10px;color:#fff;text-decoration:none;display:block;background: #005CE4;width: 240px;border-radius: 10px;margin: 10px;">
                                                Login
                                            </a>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}