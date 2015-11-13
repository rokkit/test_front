module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/uk_front',
      deployTo: '/var/www/uk_front/',
      repositoryUrl: 'git@192.168.1.39:maks_ohs/uk_front.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 3,
      deleteOnRollback: false,
      key: '~/.ssh/id_rsa',
      shallowClone: true
    },
    staging: {
      servers: 'maks@192.168.1.39'
    }
  });
};
