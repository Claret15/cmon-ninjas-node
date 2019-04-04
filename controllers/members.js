const { Member, Guild } = require('../db/models');
const { validateQueryResponse } = require('../utils');
const { validationResult } = require('express-validator/check');

exports.membersAll = function(req, res, next) {
  return (
    Member.findAll({
      attributes: {
        exclude: ['guild_id', 'createdAt', 'updatedAt']
      },
      include: [
        {
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
          },
          model: Guild,
          as: 'guild'
        }
      ]
    })
      // .then(members => res.status(200).render('members/index.handlebars', {members}))
      .then(members => res.status(200).send(members))
      .catch(error => res.status(400).send(error))
  );
};

exports.membersById = function(req, res, next) {
  return Member.findAll({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        model: Guild,
        as: 'guild'
      }
    ]
  })
    .then(member => validateQueryResponse(member, res, next))
    .catch(error => next('Invalid Query'));
};

exports.createMember = async function(req, res, next) {
  // Check if validateMember() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if Member already exists
  let member = await Member.findOne({
    where: {
      name: req.body.name
    }
  });

  if (member != null && member.name == req.body.name) {
    return res.status(422).json({
      error: 'Member already exists'
    });
  }

  return Member.create({
    name: req.body.name,
    isActive: req.body.isActive,
    title: req.body.title,
    guild_id: req.body.guild_id
  })
    .then(member => res.status(201).send({ member, success: 'Member added' }))
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to create Member'
      });
    });
};

exports.updateMember = async function(req, res, next) {
  // Check if validateMember() middleware fails and returns error message
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  // Check if Member does not exist
  let foundMember = await Member.findOne({
    where: {
      id: req.params.id
    }
  });

  if (foundMember == null) {
    return res.status(422).json({
      error: 'Member does not exist'
    });
  }

  return foundMember
    .update({
      name: req.body.name,
      isActive: req.body.isActive,
      title: req.body.title,
      guild_id: req.body.guild_id
    })
    .then(member => res.status(201).send({ member, success: 'Member updated' }))
    .catch(error => {
      return res.status(400).json({
        error: 'Unable to update Member'
      });
    });
};

exports.deleteMember = async function(req, res, next) {
  try {
    let foundMember = await Member.findOne({ where: { id: req.params.id } });
    await foundMember.destroy();
    return res.status(200).send({ foundMember, success: 'Member deleted' });
  } catch (err) {
    return res.status(404).send({ error: 'Member does not exist' });
  }
};
