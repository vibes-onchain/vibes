import Ledger from 'spotspace/lib/Ledger';
import recountLedgerVibes from '../space/recountLedgerVibes';

export default async function updateLedgerGuildMembers(client, ledger_id) {
  const ledger = await Ledger.findOne({ where: { id: ledger_id } });
  const guild_id = ledger.meta?.discord_guild_id;
  if (guild_id) {
    const guild = await client.guilds.cache.find((g) => g.id === guild_id);
    const users_vibes = await recountLedgerVibes(ledger_id);
    for (const [member_id, member] of guild.members.cache) {
      if (Object.keys(users_vibes).indexOf(member.user.id) === -1) {
        await updateGuildMember({
          client,
          guild,
          user_id: member.user?.id,
          vibes: 0,
          frenly_labels: ledger.meta?.frenly_labels,
          frenly_paren: ledger.meta?.frenly_paren,
        });
      }
    }
    for (const [user_id, vibes] of Object.entries(users_vibes)) {
      await updateGuildMember({
        client,
        guild,
        user_id,
        vibes,
        frenly_labels: ledger.meta?.frenly_labels,
        frenly_paren: ledger.meta?.frenly_paren,
      });
    }
  }
}
