'use strict';

var expect = require('chai').expect;
var Botmock = require('../index');

describe('Botmock Constructor', function() {
    it('should construct', function() {
        var result = new Botmock({
            'api_token': 'TOKEN',
        });

        expect(result.api_token).to.equal('TOKEN');
    });
});

describe('Call Teams', function() {
    var client = new Botmock({
        api_token: 'Bearer',
        debug: false,
    });
    it('should return promise', async() => {
        const data = await client.teams();
        expect(data.error).to.equal('Unauthenticated.');
    });

    it('should return with team id', async() => {
        const data = await client.teams('123');
        expect(data.error).to.equal('Unauthenticated.');
    });
});


describe('Call Projects', function() {
    var client = new Botmock({
        api_token: 'Bearer',
        debug: false,
    });

    it('should throw error without team_id', () => {
        expect(client.projects).to.throw("You must specify a team_id");
    });

    it('should pass with team_id', async() => {
        const data = await client.projects('123');
        expect(data.error).to.equal('Unauthenticated.');
    });

    it('should pass with team_id and project_id', async () => {
        const data = await client.projects('123', '234');
        expect(data.error).to.equal('Unauthenticated.');
    });
});


describe('Call Boards', function () {
    var client = new Botmock({
        api_token: 'Bearer',
        debug: false,
    });

    it('should throw error without team_id', () => {
        expect(client.boards).to.throw("You must specify a team_id");
    });

    it('should throw error without project_id', () => {
        expect(client.boards.bind(client, '123')).to.throw("You must specify a project_id");
    });


    it('should pass without board_id', async () => {
        const data = await client.boards('123', '234');
        expect(data.error).to.equal('Unauthenticated.');
    });

    it('should pass with board_id', async () => {
        const data = await client.boards('123', '234', '456');
        expect(data.error).to.equal('Unauthenticated.');
    });
});



