const { models } = require("../models");
const { Op } = require("sequelize");

async function getPageWithFilteredBlocks(id, blockId) {
  let WHERE = {};
  let includeBlock = null;
  const EXCLUDE_TYPES = ["afishaEvent"];

  // Find excluded block
  const excludeBlock = await models.Block.findOne({
    where: {
      pageId: id,
      type: EXCLUDE_TYPES,
    },
  });

  // Set WHERE clause if excluded block exists
  if (!!excludeBlock) {
    WHERE = {
      where: {
        type: { [Op.ne]: EXCLUDE_TYPES },
      },
      required: false,
    };
  }

  // Get page with filtered blocks
  const page = await models.Page.findByPk(id, {
    include: [
      {
        model: models.Block,
        as: "blocks",
        ...WHERE,
      },
    ],
    order: [[{ model: models.Block, as: "blocks" }, "position", "ASC"]],
  });

  if (!page) return null;

  // Handle specific block inclusion
  if (blockId) {
    includeBlock = await models.Block.findOne({
      where: {
        id: blockId,
        pageId: id,
        type: EXCLUDE_TYPES,
      },
    });
  } else {
    if (excludeBlock) {
      const variant = await models.Variant.findOne({
        where: {
          type: excludeBlock.type,
        },
      });

      includeBlock = await models.Block.create({
        pageId: id,
        type: variant.type,
        content: variant.content,
        styles: variant.styles,
        settings: variant.settings,
        position: excludeBlock.position,
      });
    }
  }

  // Merge and sort blocks
  const json = page.toJSON();
  const nonAfishaBlocks = Array.isArray(json.blocks) ? json.blocks : [];
  const merged = includeBlock
    ? [...nonAfishaBlocks, includeBlock]
    : nonAfishaBlocks;

  merged.sort((a, b) => {
    const pa = typeof a.position === "number" ? a.position : 0;
    const pb = typeof b.position === "number" ? b.position : 0;
    return pa - pb;
  });

  json.blocks = merged;
  return json;
}

module.exports = { getPageWithFilteredBlocks };
