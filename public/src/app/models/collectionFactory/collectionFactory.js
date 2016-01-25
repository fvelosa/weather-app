'use strict';

var _ = require('lodash')

module.exports = CollectionFactory

function CollectionFactory() {

	/* A generic collection with sequencial object ids*/
	function Collection() {
		var self = this

		this.reset = reset
		this.reset()

		function reset() {
			self.nextId = 1
			self.contents = []
		}
	}

	Collection.prototype.getAll = function () {
		return this.contents
	}

	Collection.prototype.search = function (filter) {
		return _.filter(this.contents, filter)
	}

	Collection.prototype.get = function (id) {
		return _.find(this.contents, {
			id: id
		})
	}

	Collection.prototype.new = function (obj) {

		obj.id = this.nextId
		this.contents.push(obj)

		this.nextId++

			return obj
	}

	Collection.prototype.delete = function (id) {

		var index = _.findIndex(this.contents, {
			id: id
		})

		if (index === 0 || index) {
			this.contents.splice(index, 1)
			return true
		} else {
			return false
		}
	}

	Collection.prototype.update = function (id, attr, newValue) {
		var obj = this.get(id)

		obj[attr] = newValue

		return obj
	}

	return new Collection()
}