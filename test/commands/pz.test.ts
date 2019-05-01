import {expect, test} from '@oclif/test'

describe('Pullzone command test', () => {
  test
    .nock("https://bunnycdn.com/api", api => { api
      .get("/pullzone")
      .reply(200, [{
        Id: "111",
        Value: "testcdn",
        Hostnames: []
      }]);

    })
    .stdout()
    .retries(20) // Sometimes the test fails to capture the stdout
    .command(["pz", "-l"])
    .it('Minimum information fetch', ctx => {
      expect(ctx.stdout).to.contain(`id   cacheQuality  name  hostnames
---  ------------  ----  ---------
111                               

`);
    });

    test
    .nock("https://bunnycdn.com/api", api => { api
      .get("/pullzone")
      .reply(200, [{
        Id: "111",
        Value: "testcdn",
        CacheQuality: "85",
        Name: "testcdn",
        Hostnames: [{
          Id: "02",
          Value: "b.a.c"
        }]
      }]);

    })
    .stdout()
    .retries(20) // Sometimes the test fails to capture the stdout
    .command(["pz", "-l"])
    .it('Minimum information fetch', ctx => {
      expect(ctx.stdout).to.contain(`
111  85`);
    });
});
