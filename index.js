import { resolve } from 'path';
import serverRoute from './server/routes/routing';

export default function (kibana) {
  return new kibana.Plugin({

    require: ['elasticsearch'],
    name: 'kibana-xlsx-import',
    uiExports: {

      app: {
        title: 'XLSX Import',
        description: 'Import XLSX to JSON',
        main: 'plugins/kibana-xlsx-import/app',
        url: '/app/kibana-xlsx-import',
        icon: 'plugins/kibana-xlsx-import/ressources/icon.svg'
      },

      uiSettingDefaults: {
        'kibana-xlsx-import:bulk_package_size': {
          value: 1000,
          description: 'The number of json item send in one bulk request'
        },
        'kibana-xlsx-import:displayed_rows': {
          value: 5,
          description: 'Number of row displayed in the preview'
        }
      },

    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },


    init(server, options) {
      // Add server routes and initialize the plugin here
      const adminCluster = server.plugins.elasticsearch.getCluster('admin');
      const dataCluster = server.plugins.elasticsearch.getCluster('data');

      serverRoute(server, adminCluster, dataCluster);
    }
  });
};
