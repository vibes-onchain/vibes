import useRouter from ":/lib/useRouter";
import LedgerTable from ":/components/LedgerTable";
import DiscordGuildLabel from ":/components/DiscordGuildLabel";
import DiscordGuildName from ":/components/DiscordGuildName";
import DiscordGuildAvatar from ":/components/DiscordGuildAvatar";
import DiscordGuildBanner from ":/components/DiscordGuildBanner";
import { Menu, Segment } from "semantic-ui-react";

export default function CommunityHeader({ guild_id, tab }) {
  const router = useRouter();
  const ledger_id = router.match.params.ledger_id;

  return (
    <>
      <DiscordGuildBanner guild_id={guild_id} />
      <div className="page-container">
        <div className="guild-avatar-holder">
          <DiscordGuildAvatar
            guild_id={guild_id}
            imgClassName={"rounded-full inline-block h-30 w-30"}
          />
        </div>
        <div className="guild-name-holder">
          <DiscordGuildName guild_id={guild_id} />
        </div>
      </div>
      <div className="page-container">
        <Menu pointing secondary className="tabs">
          <Menu.Item
            name="leaderboard"
            active={tab === 'leaderboard'}
            onClick={() => {
              router.push(`/ledger/${ledger_id}`);
            }}
          />
          <Menu.Item
            name="ledger"
            active={tab === 'ledger'}
            onClick={() => {
              router.push(`/ledger/${ledger_id}/entries`);
            }}
          />
          <Menu.Item
            name="vibenomics"
            active={tab === 'vibenomics'}
            onClick={() => {
              router.push(`/ledger/${ledger_id}/settings`);
            }}
          />
        </Menu>
      </div>
    </>
  );
}
