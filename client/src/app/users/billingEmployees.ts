export interface IBillingUser {
  username: string;
  password?: string;
  role: string;
}

export const billingUserNames: IBillingUser[] = [
  { username: "aahsan", password: "aan@5", role: "clerk" },
  { username: "amalik", password: "am@6", role: "clerk" },
  { username: "zhashim", password: "zh@7", role: "clerk" },
  { username: "noofa", password: "no@5", role: "clerk" },
  { username: "sajaj", password: "sa@5", role: "clerk" },
  { username: "hmaytham", password: "hm@8", role: "clerk" },
  { username: "bjawad", password: "bj@6", role: "clerk" },
  { username: "kaledani", password: "ka@8", role: "clerk" },
  { username: "amizban", password: "am@7", role: "clerk" },

  { username: "emansour", password: "em@8", role: "billingsupervisor" },
  { username: "zfadel", password: "zf@6", role: "billingsupervisor" },
  { username: "fkhalid", password: "fk@7", role: "billingsupervisor" },
  { username: "aasaad", password: "aa@6", role: "billingsupervisor" },

  { username: "msevilla", password: "ms@8", role: "billingsuperintendent" },
  { username: "mqassim", password: "mq@7", role: "billingsuperintendent" },
  

  { username: "mcortez", password: "mc@7", role: "itadmin" },
  { username: "rneel", password: "rn@5", role: "itadmin" },
  { username: "gmohammed", password: "gm@9", role: "itadmin" },
  { username: "aaldairawi", password: "aa@10", role: "itadmin" },
];
