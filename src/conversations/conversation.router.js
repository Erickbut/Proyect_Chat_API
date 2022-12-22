const router = require('express').Router()
const conversationServices = require('./conversation.services')
const messageServices = require('../messages/messages.services')
const passportJWT = require('../middlewares/auth.middleware')
const participantValidate = require('../middlewares/participantValidate.middleware')

router.route('/')
  .get(passportJWT.authenticate('jwt', { session: false }), conversationServices.getAllConversations)
  .post(passportJWT.authenticate('jwt', { session: false }), conversationServices.postConversation)

router.route('/:conversation_id')
  .get(passportJWT.authenticate('jwt', { session: false }), conversationServices.getConversationById)
  .patch(passportJWT.authenticate('jwt', { session: false }), conversationServices.patchConversation)
  .delete(passportJWT.authenticate('jwt', { session: false }), conversationServices.deleteConversation)


router.route('/:conversation_id/messages')
  .post(passportJWT.authenticate('jwt', { session: false }), participantValidate, messageServices.postMessage)
  .get(passportJWT.authenticate('jwt', { session: false }), participantValidate, messageServices.getAllMessages)

router.route('/:conversation_id/messages/:id')
  .get(passportJWT.authenticate('jwt', { session: false }), participantValidate, messageServices.getMessagesById)
  .delete(passportJWT.authenticate('jwt', { session: false }),participantValidate, messageServices.deleteMessage)

  module.exports = router