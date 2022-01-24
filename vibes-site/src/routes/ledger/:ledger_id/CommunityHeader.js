/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/core";

import useRouter from ":/lib/useRouter";
import LedgerTable from ":/components/LedgerTable";
import DiscordGuildLabel from ":/components/DiscordGuildLabel";
import DiscordGuildName from ":/components/DiscordGuildName";
import DiscordGuildDescription from ":/components/DiscordGuildDescription";
import DiscordGuildAvatar from ":/components/DiscordGuildAvatar";
import DiscordGuildBanner from ":/components/DiscordGuildBanner";
import { Menu, Segment } from "semantic-ui-react";

export default function CommunityHeader({ guild_id, tab }) {
  const router = useRouter();
  const ledger_id = router.match.params.ledger_id;

  return (
    <div css={CSS}>
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
        <div className="guild-description-holder">
          <DiscordGuildDescription guild_id={guild_id} />
        </div>
      </div>
      <div className="page-container tabs-holder">
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
    </div>
  );
}

const CSS = css`
  width: 100%;
  .guild-avatar-holder {
    width: 110px;
    margin-top: -80px;
    margin-bottom: 40px;
  }
  .guild-name-holder {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 45px;
    font-weight: 800;
    line-height: 1.1em;
    text-align: justify; 
  }
  .guild-description-holder{
    width: 400px;
    max-width: 95%;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.25em;
  }
  .tabs-holder {
    padding: 0;
    margin: 0;
    max-width: 100%;
    @media (min-width: 500px) {
      padding: inherit;
      margin: 0 auto;
      max-width: inherit;
    }
  }
  .tabs {
    .item {
      font-weight: 700;
      font-size: 15px;
      margin: 0 10px !important;
      @media (min-width: 500px) {
        margin: 0 35px !important;
      }
    }
    &.ui.secondary.menu {
      .active.item {
        padding: 0px;
        padding-bottom: 10px;
      }
      .active.item, .item {
        padding: 0px;
        padding-bottom: 10px;
      }
    }
  }
  body.dark-theme & {
    .ui.secondary.pointing.menu {
      border-bottom: 1px solid #5b5b5b;
    }
    .ui.secondary.menu {
      .active.item {
        border-color: #f2f2f2;
      }
      .active.item, .item {
        color: #f2f2f2;
      }
    }
  }
`;