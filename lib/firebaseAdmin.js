const admin = require("firebase-admin");

const {handleErr} = require('../api/utils/helper')
var serviceAccount = require('../components/secrets/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});

var f = {};
let isDev = false;
f.fetchUser = (uid, mobile) => {
    // //console.log('s')
    return new Promise((resolve, reject) => {
        if (isDev) {
            resolve({phoneNumber: mobile})
        } else {
            admin.auth().getUser(uid)
                .then(function (userRecord) {
                    resolve(userRecord.toJSON())
                    // See the UserRecord reference doc for the contents of userRecord.
                    //console.log("Successfully fetched user data:", userRecord.toJSON());
                })
                .catch(function (error) {
                    reject(error)
                    //console.log("Error fetching user data:", error);
                });
        }
    })

}
f.validateUser = (req, res, next) => {
    let uid = req.body.uuid, mobile = req.body.number;
    // //console.log('s')

    if (isDev) {
        resolve({phoneNumber: mobile})
    } else {
        admin.auth().getUser(uid)
            .then(function (userRecord) {
                next(userRecord.toJSON())
                // See the UserRecord reference doc for the contents of userRecord.
                //console.log("Successfully fetched user data:", userRecord.toJSON());
            })
            .catch(function (error) {
                handleErr(error, res)
                //console.log("Error fetching user data:", error);
            });
    }

}

f.sendNotification = (param) => {
    return new Promise((resolve, reject) => {


        var message = {
            notification: {
                title: '',
                body: '',
            },
            android: {
                // ttl: 3600 * 1000,
                // notification: {
                //     icon: 'stock_ticker_update',
                //     color: '#f45342',
                // },
            },
            apns: {
                payload: {
                    aps: {
                        // badge: 42,
                        sound: "default",
                    },
                },
            },
            token: param.token
        };
        var d2 = {};
        d2.user = param.userName;
        d2.eventName = "eventName";

        switch (param.type) {

            case 1 ://attending anevent
                message.notification.title = `Event reminder`;
                message.notification.body = `Event is about to start, hope you have a great time`;
                break;
            case 2 ://event invite
                message.notification.title = `${d2.user} has invited you to an event`;
                message.notification.body = `Come check out this event, we will have so much fun`;
                break;
            case 3 :// like
                message.notification.title = `New like on picture`;
                message.notification.body = `${d2.user} has liked your picture`;
                break;
            case 4 ://comment
                message.notification.title = `New Comment`;
                message.notification.body = `${d2.user} has commented on your picture respond now`;
                break;
            case 5 ://request for guest list
                message.notification.title = `Guest List Request`;
                message.notification.body = `${d2.user} wants to be on the Guest List for ${d2.eventName}`;
                break;
            case 6 ://friend request
                message.notification.title = `New Connect Request`;
                message.notification.body = `${d2.user} has sent you a connect request`;
                break;
            case 7 ://attending event
                message.notification.title = `New Attendee`;
                message.notification.body = `${d2.user} is attending ${d2.eventName}`;
                break;
            case 8 ://new connect
                message.notification.title = `New Connect`;
                message.notification.body = `${d2.user} has connected with you.`;
                break;
            case 9 ://package renewal
                message.notification.title = `LetsPartii`;
                message.notification.body = `Your monthly package has been renewed.`;
                break;
            case 10 ://tagged in photo
                message.notification.title = `New Tag on Image`;
                message.notification.body = `${d2.user} tagged you in an image`;
                break;
            case 11 ://message request
                message.notification.title = `New Message Request`;
                message.notification.body = `${d2.user} wants to send you a message, accept or reject now.`;
                break;
            case 404 ://message request
                message.notification.title = param.title;
                message.notification.body = param.message;
                break;
            default:
                reject("message type invalid");

        }
        message.data = param.data;
        message.data.notificationType = String(param.type);
        // if(fToken!=="")
        // //console.log(message);
        admin.messaging().send(message)
            .then((respo) => {
                resolve(respo)
            })
            .catch((error) => {
                reject(error)

            });
        // resolve(message);
        // admin.messaging().sendMu

    });

};
f.sendNotificationMulticast = (param) => {
    return new Promise((resolve, reject) => {

        var message = {
            notification: {
                title: '',
                body: '',
            },
            android: {
                // ttl: 3600 * 1000,
                // notification: {
                //     icon: 'stock_ticker_update',
                //     color: '#f45342',
                // },
            },
            apns: {
                payload: {
                    aps: {
                        // badge: 42,
                        sound: "default",
                    },
                },
            },
            tokens: param.token
        };
        var d2 = {};
        d2.user = param.userName;
        d2.eventName = "eventName";
        param.imageId = '296883';
        switch (param.type) {

            case 1 ://attending anevent
                message.notification.title = `Event reminder`;
                message.notification.body = `Event is about to start, hope you have a great time`;
                break;
            case 2 ://event invite
                message.notification.title = `${d2.user} has invited you to an event`;
                message.notification.body = `Come check out this event, we will have so much fun`;
                break;
            case 3 :// like
                message.notification.title = `New like on picture`;
                message.notification.body = `${d2.user} has liked your picture`;
                break;
            case 4 ://comment
                message.notification.title = `New Comment`;
                message.notification.body = `${d2.user} has commented on your picture respond now`;
                break;
            case 5 ://request for guest list
                message.notification.title = `Guest List Request`;
                message.notification.body = `${d2.user} wants to be on the Guest List for ${d2.eventName}`;
                break;
            case 6 ://friend request
                message.notification.title = `New Connect Request`;
                message.notification.body = `${d2.user} has sent you a connect request`;
                break;
            case 7 ://attending event
                message.notification.title = `New Attendee`;
                message.notification.body = `${d2.user} is attending ${d2.eventName}`;
                break;
            case 8 ://new connect
                message.notification.title = `New Connect`;
                message.notification.body = `${d2.user} has connected with you.`;
                break;
            case 9 ://package renewal
                message.notification.title = `LetsPartii`;
                message.notification.body = `Your monthly package has been renewed.`;
                break;
            case 10 ://tagged in photo
                message.notification.title = `New Tag on Image`;
                message.notification.body = `${d2.user} tagged you in an image`;
                break;
            case 11 ://message request
                message.notification.title = `New Message Request`;
                message.notification.body = `${d2.user} wants to send you a message, accept or reject now.`;
                break;
            case 404 ://message request
                message.notification.title = param.title;
                message.notification.body = param.message;
                break;
            default:
                reject("message type invalid");

        }
        // param.type='12'

        message.data = param.data;
        message.data.notificationType = String(param.type);
        // if(fToken!=="")
        // console.log('message',message.tokens);
        admin.messaging().sendMulticast(message)
            .then((respo) => {
                resolve(respo)
            })
            .catch((error) => {
                reject(error)

            });
        // resolve(message);
        // admin.messaging().sendMu

    });

};

f.sendPushNotification = (param) => {
    return new Promise((resolve, reject) => {


        var message = {
            notification: param.notif,
            android: {
                data: {
                    notificationType: param.notificationType
                }
                // ttl: 3600 * 1000,
                // notification: {
                //     icon: 'stock_ticker_update',
                //     color: '#f45342',
                // },
            },
            apns: {
                payload: {
                    aps: {
                        // badge: 42,
                        sound: "default",
                    },
                },
            },
            token: param.token,
            data: param.data
        };
        admin.messaging().send(message)
            .then((respo) => {
                resolve(respo)
            })
            .catch((error) => {
                reject(error)

            });
        // resolve(message);

    });

};

f.customToken = (mobile) => {
    // //console.log('s')
    return new Promise((resolve, reject) => {
        if (isDev) {
            resolve({phoneNumber: mobile})
        } else {
            admin.auth().getUserByPhoneNumber(mobile).then(usr => {
                console.log('firebaseUser', usr);
                let uid = usr.uid;
                admin.auth().createCustomToken(uid)
                    .then(function (customToken) {
                        // Send token back to client
                        // console.log('customToken', customToken);
                        resolve(customToken)
                    })
                    .catch(function (error) {
                        reject(error);
                        console.log('Error creating custom token:', error);
                    });

            }).catch(e => {
                console.log('Error getting user from phone number:', e);
                reject(e)
            })

        }
    })
};

module.exports = f;
// f.customToken('+919131388606').then(p => {
//     console.log(p);
// }).catch(e => {
//     console.log(e);
// })
// let uid = '+17007007';

// admin.auth().getUserByPhoneNumber(uid)
//     .then(function(userRecord) {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log('Successfully fetched user data:', userRecord.toJSON());
//     })
//     .catch(function(error) {
//         console.log('Error fetching user data:', error);
//     });

// admin.auth().createUser({
//     email: '',
//     emailVerified: false,
//     phoneNumber: '+17007007',
//     password: 'secretPassword',
//     displayName: 'LetsPartii®',
//     photoURL: 'http://www.example.com/12345678/photo.png',
//     disabled: false
// })
//     .then(function(userRecord) {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log('Successfully created new user:', userRecord.uid);
//     })
//     .catch(function(error) {
//         console.log('Error creating new user:', error);
//     });
// console.log(admin);
