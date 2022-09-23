import { Card, CardContent, Typography } from '@material-ui/core'
import React, { forwardRef } from 'react';
import './Message.css'

const Message = forwardRef(({ userName, msg },ref ) => {

    const isUser = userName === msg.userName;

    return (
        <div ref = {ref}>
            <p className={`title ${isUser && 'titleUser'}`}><strong>{msg.userName}: </strong></p>
            <Card className={`message ${isUser && 'messageUser'}`}>
                <CardContent>
                    <Typography 
                        gutterBottom
                    >
                        {msg.msgs}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
