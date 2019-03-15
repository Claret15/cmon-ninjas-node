const { Member, Guild } = require('../db/models');

exports.membersAll = function(req,res, next) {
  return Member
  .findAll(
    {
      attributes: { 
        exclude: [
          'guild_id',
          'createdAt', 
          'updatedAt'
        ]
      },
      include: [{
        attributes: { 
          exclude: [
            'id',
            'createdAt', 
            'updatedAt'
          ]
        },
        model: Guild, 
        as: 'guild'
      }]
    }
  )
  // .then(members => res.status(200).render('members/index.handlebars', {members}))
  .then(members => res.status(200).send(members))
  .catch(error => res.status(400).send(error));
  
};

// exports.createMember = function(req,res, next) {
//       return Member
//       .create({
//         name: req.body.name, 
//         is_active: req.body.active,
//         title: req.body.title
//       })
//       .then(user => res.status(201).send(user))
//       .catch(error => res.status(400).send(error));
// }
