import forge from 'mappersmith';
export const clients = forge({
  clientId: 'frontend',
  host: 'http://localhost:3333',
  resources: {
    Bankid: {
      auth: { path: '/bankid/auth', method: 'post' },
      sign: { path: '/bankid/sign', method: 'post' },
      collect: { path: '/bankid/collect/{orderRef}', method: 'put' },
      cancel: { path: '/bankid/cancel/{orderRef}', method: 'delete' },
    },
  },
});
