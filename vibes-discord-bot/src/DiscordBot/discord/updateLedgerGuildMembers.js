import Ledger from 'spothub/lib/Ledger';
import recountLedgerVibes from '../spothub/recountLedgerVibes';
import updateGuildMember from './updateGuildMember';

export default async function updateLedgerGuildMembers(client, ledger_id) {
  const ledger = await Ledger.findOne({ where: { id: ledger_id } });
  const guild_id = ledger.meta?.['vibes:discord_guild_id'];
  console.log({ledger, guild_id});
  if (guild_id) {
    const guild = await client.guilds.cache.find((g) => g.id === guild_id);
    console.log({ ledger, guild });
    const users_vibes = await recountLedgerVibes(ledger_id);
    for (const [member_id, member] of guild?.members.cache) {
      if (Object.keys(users_vibes).indexOf(member.user.id) === -1) {
        await updateGuildMember({
          client,
          guild,
          user_id: member.user?.id,
          vibes: 0,
          frenly_labels: JSON.parse(ledger.meta?.['vibes:labels'] || "{}"),
          frenly_paren: ledger.meta?.['vibes:paren'],
        });
      }
    }
    for (const [user_id, vibes] of Object.entries(users_vibes)) {
      await updateGuildMember({
        client,
        guild,
        user_id,
        vibes,
        frenly_labels: JSON.parse(ledger.meta?.['vibes:labels'] || "{}"),
        frenly_paren: ledger.meta?.['vibes:paren'],
      });
    }
  }
}
