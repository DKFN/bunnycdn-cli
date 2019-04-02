import {expect, test} from '@oclif/test'

describe('init state tests', () => {
  test
    .stdout()
    .command(["key", "-l"])
    .it('tests to list an empty unconfigured file', ctx => {
      expect(ctx.stdout).to.contain(`==== PullZones : 



==== Storages: 



`   );
  });

  test
    .stderr()
    .command(["key", "-d", "default"])
    .it("Tries to delete a default key", ctx => {
      expect(ctx.stderr).to.contain("There is no key");
  });

  test
    .stderr()
    .command(["key", "-s", "default"])
    .exit(1)
    .it("Tries to set default key without value");


});

describe('adding, deleting, editing pullzone key', () => {
  test
    .stdout()
    .command(["key", "-s", "default", "-v", "mynewkey"])
    .it("Tries to add default pullzone key with minimal params", ctx => {
      expect(ctx.stdout).to.contain("Key successfully set: default");
    });

  test
    .stdout()
    .command(["key", "-l"])
    .it("List after adding the default key", ctx => {
      expect(ctx.stdout).to.contain( `==== PullZones : 
name     value   
-------  --------
default  mynewkey

==== Storages: 



`);

    });

  test
    .stdout()
    .command(["key", "-d", "default"])
    .it("List after deletion");

    test
    .stdout()
    .command(["key", "-l"])
    .it('List after deletion of the file', ctx => {
      expect(ctx.stdout).to.contain(`==== PullZones : 



==== Storages: 



`);
  });

});
