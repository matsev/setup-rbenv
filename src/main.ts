import * as core from '@actions/core';
import * as installer from './installer';

async function run() {
  try {

    if (process.platform !== 'linux') {
      core.error(`Not a supported platform. Only Linux is supported.`);
    }

    let options: installer.RbenvOptions = {
      rbenvRoot: "/home/runner/.rbenv",
      rbenvRootOwner: "runner"
    }

    let rbenvRoot = core.getInput('rbenv_root');
    let rbenvRootOwner = core.getInput('rbenv_root_owner');

    if (!!rbenvRoot) {
      options.rbenvRoot = rbenvRoot;
    }

    if (!!rbenvRootOwner) {
      options.rbenvRootOwner = rbenvRootOwner;
    }

    await installer.intallRbenv(options);
    await installer.installRubyBuild(options);

    core.exportVariable('RBENV_ROOT', options.rbenvRoot);
    core.addPath(`${options.rbenvRoot}/bin`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
