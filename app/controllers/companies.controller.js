const db = require("../models");
const Companies = db['companies'];

exports.create = (req, res) => {
  try {
    const users = new Companies(req.body);
    users
      .save(users)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(error => {
        var message = error.message;
        if (error.code == 11000) {
          message = "Email already exist.";
        }

        res.status(500).send({
          message:
            message || "Some error occurred while creating the Companies."
        });
      });
  } catch (error) {
    res
      .status(500)
      .send(
        {
          message: "Wrong document or schema"
        }
      );
  }
};

exports.finds = (req, res) => {
  try {
    var condition = {};
    if (req.query.type) {
      condition.type = req.query.type.split(",");
    }
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);

    if (limit > -1 && offset > -1) {
      Companies.find(condition)
        .skip(offset).limit(limit)
        .then(data => {
          res.send(data);
        })
        .catch(error => {
          res.status(500).send({
            message:
              error.message || "Some error occurred while retrieving Companies."
          });
        });
    } else {
      Companies.find(condition)
        .then(data => {
          res.send(data);
        })
        .catch(error => {
          res.status(500).send({
            message:
              error.message || "Some error occurred while retrieving Companies."
          });
        });
    }

  } catch (error) {
    res
      .status(500)
      .send(
        {
          message: "Wrong document or schema"
        }
      );
  }
};

exports.find = (req, res) => {
  try {
    const id = req.params.id;

    Companies.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found with id " + id });
        else res.send(data);
      })
      .catch(error => {
        res
          .status(500)
          .send({ message: "Error retrieving with id=" + id });
      });
  } catch (error) {
    res
      .status(500)
      .send(
        {
          message: "Wrong document or schema"
        }
      );
  }

};

exports.update = (req, res) => {
  try {
    const id = req.params.id;

    Companies.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      runValidators: true
    })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update with id=${id}`
          });
        } else {
          res.send({ message: "Updated successfully." })
        };
      })
      .catch(error => {
        var message = error.message;
        if (error.code == 11000) {
          message = "Email already exist.";
        }
        res.status(500).send({
          message: message || "Error updating with id=" + id
        });
      });
  } catch (error) {
    res
      .status(500)
      .send(
        {
          message: "Wrong document or schema"
        }
      );
  }
};

exports.delete = (req, res) => {
  try {
    const id = req.params.id;

    Companies.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete with id=${id}. Maybe record was not found!`
          });
        } else {
          res.status(200).send({
            message: "Deleted"
          });
        }
      })
      .catch(error => {
        res.status(500).send({
          message: "Could not delete with id=" + id
        });
      });
  } catch (error) {
    res
      .status(500)
      .send(
        {
          message: "Wrong document or schema"
        }
      );
  }
};

exports.deleteAll = (req, res) => {
  try {
    Companies.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} were deleted successfully!`
        });
      })
      .catch(error => {
        res.status(500).send({
          message:
            error.message || "Some error occurred while removing all Companies."
        });
      });
  } catch (error) {
    res
      .status(500)
      .send(
        {
          message: "Wrong document or schema"
        }
      );
  }
};