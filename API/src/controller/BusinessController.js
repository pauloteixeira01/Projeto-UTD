const BusinessModel = require('../model/BusinessModel');
const { 
    startOfDay, 
    endOfDay, 
    startOfWeek, 
    endOfWeek, 
    startOfMonth, 
    endOfMonth,
    startOfYear,
    endOfYear
 } = require('date-fns');

const current = new Date();

class BusinessController {

    async create(req, res) {
        const business = new BusinessModel(req.body);
        await business
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async update(req, res) {
        await BusinessModel.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }

    async all(req, res) { //read
        await BusinessModel.find({ macaddress: {'$in': req.params.macaddress} })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async show(req, res) {
        await BusinessModel.findById(req.params.id)
            .then(response => {
                if (response) {
                    return res.status(200).json(response);
                } else {
                    return res.status(404).json({error: 'Tarefa não encontrada'});
                }
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async delete(req, res) {
        await BusinessModel.deleteOne({'_id': req.params.id})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }

    async done(req, res) {
        await BusinessModel.findByIdAndUpdate(
            {'_id': req.params.id}, 
            {'done': req.params.done}, 
            {new: true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);    
            });
    }

    async late(req, res) {
        await BusinessModel
        .find({
            'when': {'$lt': current},
            'macaddress': {'$in': req.params.macaddress}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async today(req, res) {
        await BusinessModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }

    async week(req, res) {
        await BusinessModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }

    async month(req, res) {
        await BusinessModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }

    async year(req, res) {
        await BusinessModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }

}

module.exports = new BusinessController();