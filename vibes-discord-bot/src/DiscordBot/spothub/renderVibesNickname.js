import _ from "lodash";
import formatNumber from "../../lib/formatNumber";
import { Liquid } from "liquidjs";

const MAX_NICKNAME_LENGTH = 32;

const DEFAULT_TEMPLATE =
  "{{username | truncate_last}} {% if vibestack < 0 %}⊖{%endif%}{% if vibestack > 0 %} ⩔ {%endif%}{% if vibestack < 0 %}{{ vibestack | unsigned | rounded }}{% endif %}{% if vibestack > 0 %}{{ vibestack | rounded }}{% endif %}{% if vibe_level == 1 %} ·{% endif %}{% if vibe_level == 2 %} ∶{% endif %}{% if vibe_level == 3 %} ⁖{% endif %}{% if vibe_level == 4 %} ⁘{% endif %}{% if vibe_level == 5 %} ⁙{% endif %}";

async function evalTemplate(template, context) {
  const engine = new Liquid();
  try {
    await engine.parse(template);
  } catch (e) {
    console.log(e, template);
    return { error: "invalid template" };
  }
  engine.registerFilter("truncate_last", (v) => v);
  engine.registerFilter("only_characters", (v) => {
    return v.replace(
      /[^0-9_\- A-Za-zÀ-ÖØ-öø-ÿ一-龠ぁ-ゔァ-ヴー々〆〤ａ-ｚＡ-Ｚ０-９\u3131-\uD79D\p{Unified_Ideograph=yes}]/gi,
      ""
    );
  });
  engine.registerFilter("only_alphanumerics", (v) => {
    return v.replace(/[^0-9_\- A-Za-zÀ-ÖØ-öø-ÿ]/gi, "");
  });
  engine.registerFilter("remove_brackets", (v) => {
    return v.replace(/[\[\]\(\)]/g,'')
  });
  engine.registerFilter("remove_emojis", (v) => {
    return v.replace(
      /(?![*#0-9]+)[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu,
      ""
    );
  });
  engine.registerFilter("unsigned", (v) => {
    return _.isNumber(v) && v < 0 ? -1 * v : v;
  });
  engine.registerFilter("rounded", (v) => {
    return formatNumber(Math.floor(v), "si_rounded");
  });
  const draft1 = await engine.parseAndRender(template, context);
  if (draft1.length < MAX_NICKNAME_LENGTH) {
    return draft1;
  }
  engine.registerFilter("truncate_last", (v) => "");
  const draft2 = await engine.parseAndRender(template, context);
  engine.registerFilter("truncate_last", (v) => {
    return `${v.substring(
      0,
      Math.max(3, MAX_NICKNAME_LENGTH - draft2.length)
    )}…`;
  });
  const draft3 = await engine.parseAndRender(template, context);
  return draft3.substring(0, MAX_NICKNAME_LENGTH);
}

export default async function renderParen({ template, context }) {
  return evalTemplate(
    template && template.length ? template : DEFAULT_TEMPLATE,
    context
  );
}
