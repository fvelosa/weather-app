'use strict';

var collectionFactory = require('./CollectionFactory');

describe('Test the collection Factory', function () {
	var collection, collection1

	beforeEach(function () {
		collection = collectionFactory()
		collection1 = collectionFactory()
	})

	it('should be empty to start with', function () {
		expect(collection.getAll().length).toBe(0);
	});

	it('should have one value after new', function () {
		collection.new({
			value: 'test'
		})

		expect(collection.getAll().length).toBe(1);
	});

	it('should have 2 objects after 2 new', function () {
		collection.new({
			value: 'test1'
		})
		collection.new({
			value: 'test2'
		})

		expect(collection.getAll().length).toBe(2);
	});

	it('should get the right value', function () {
		collection.new({
			value: 'test1'
		})
		var index = collection.new({
			value: 'test2'
		}).id
		collection.new({
			value: 'test3'
		})

		expect(collection.get(index).value).toBe('test2');
	});

	it('should delete from the list', function () {
		collection.new({
			value: 'test1'
		})
		var index2 = collection.new({
			value: 'test2'
		}).id
		var index3 = collection.new({
			value: 'test3'
		}).id
		collection.new({
			value: 'test4'
		})

		collection.delete(index3)

		expect(collection.get(index2).value).toBe('test2');
		expect(collection.getAll().length).toBe(3);
	});

	it('update should change an attribute of the object', function () {
		collection.new({
			value: 'test1'
		})
		var index2 = collection.new({
			value: 'test2'
		}).id
		collection.new({
			value: 'test3'
		})

		collection.update(index2, 'value', 'new_test')

		expect(collection.get(index2).value).toBe('new_test');
		expect(collection.getAll().length).toBe(3);
	});

	it('test memory isolation', function () {
		collection.new({
			value: 'test1'
		})
		var index2 = collection.new({
			value: 'test2'
		}).id

		collection1.new({
			value: 'collection1-1'
		})
		var index1To2 = collection1.new({
			value: 'collection1-2'
		}).id

		expect(collection.get(index2).value).toBe('test2');
		expect(collection1.get(index1To2).value).toBe('collection1-2');
		expect(collection.getAll().length).toBe(2);
	});

	it('test filter', function () {
		collection.new({
			value: 'test',
			status: 'completed'
		})
		collection.new({
			value: 'test1',
			status: 'ongoing'
		})
		collection.new({
			value: 'test2',
			status: 'planned'
		})

		var set = collection.search({
			status: 'ongoing'
		})

		expect(set.length).toBe(1);
		expect(set[0].value).toBe('test1');
		expect(set[0].status).toBe('ongoing');

		set = collection.search({
			status: 'completed'
		})

		expect(set.length).toBe(1);
		expect(set[0].value).toBe('test');
		expect(set[0].status).toBe('completed');
	});
});