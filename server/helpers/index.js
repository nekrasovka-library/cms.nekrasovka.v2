const { models } = require("../models");
const { Op } = require("sequelize");

async function getPageWithFilteredBlocks({ pageId, blockId }) {
  const EXCLUDE_TYPES = ["afishaEvent"];
  let WHERE = {};
  let newBlock;
  let page;
  let blockIdNum;

  const includedBlock = await models.Block.findOne({
    where: { type: EXCLUDE_TYPES, pageId },
  });

  if (includedBlock) {
    if (blockId) {
      blockIdNum = Number.parseInt(blockId, 10);
    } else {
      const variant = await models.Variant.findOne({
        where: { type: includedBlock.type },
      });

      newBlock = await models.Block.create({
        type: includedBlock.type,
        position: includedBlock.position,
        settings: variant.settings,
        styles: variant.styles,
        content: variant.content,
        pageId: includedBlock.pageId,
      });

      blockIdNum = newBlock.id;
    }

    WHERE = {
      where: {
        [Op.or]: [
          { type: { [Op.notIn]: EXCLUDE_TYPES } }, // массив обязателен
          { id: blockIdNum }, // оставить конкретный блок
        ],
      },
      required: false,
    };
  }

  page = await models.Page.findByPk(pageId, {
    include: [{ model: models.Block, as: "blocks", ...WHERE }],
    order: [[{ model: models.Block, as: "blocks" }, "position", "ASC"]],
  });

  return page;
}

module.exports = { getPageWithFilteredBlocks };
