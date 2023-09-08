function handleGeneric(base, offset, key, sorted, updates) {
    if (isNaN(base) && isNaN(offset)) return;
    if (sorted.length == 0) return;

    // We are trying to use an offset, but do not have a base. Find our implied base.
    if (!isNaN(offset) && isNaN(base)) {
        const baseElement = sorted[0];
        base = baseElement[key];
    }

    sorted.forEach((element, idx) => {
        let newElement = {};
        newElement[key] = base + (isNaN(offset) ? 0 : offset) * idx;

        updates[element._id] = mergeObject(updates[element._id], newElement);
    })
}

Hooks.on(
    'getSceneControlButtons',
    (controls, b, c) => {
        let alignX = {
            name: "alignX",
            title: game.i18n.localize("gracefulalignment.name"),
            icon: "fa fa-route",
            // Other options I am considering:
            // sort (used in another tab for elevation), arrow-up-right-from-square (would be better down right), route, repeat, clone, turn down, shuffle, right-left
            toggle: false,
            active: false,
            onClick: async (toggle) => {
                let firstW = '100px';
                let secondW = '16px';
                let thirdW = '16px';

                return new Promise(async (resolve, reject) => {
                    let myValue = await Dialog.prompt({
                        title: game.i18n.localize("gracefulalignment.name"),
                        content: `
                            <div style="margin-bottom: 10px;">
                                <div style="display: flex;">
                                    <div style="flex: 0 0 ${firstW};"></div>
                                    <div style="flex: 1 0 ${secondW};">X</div>
                                    <div style="flex: 1 0 ${thirdW};">Y</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="flex: 0 0 ${firstW}">${game.i18n.localize("gracefulalignment.base")}</div>
                                    <div style="flex: 1 0 ${secondW};"><input type="text" id="base-x" /></div>
                                    <div style="flex: 1 0 ${thirdW};"><input type="text" id="base-y" /></div>
                                </div>
                                <div style="display: flex;">
                                    <div style="flex: 0 0 ${firstW}">${game.i18n.localize("gracefulalignment.offset")}</div>
                                    <div style="flex: 1 0 ${secondW};"><input type="text" id="offset-x" /></div>
                                    <div style="flex: 1 0 ${thirdW};"><input type="text" id="offset-y" /></div>
                                </div>
                                <div style="display: flex;">
                                    <div style="flex: 0 0 ${firstW}">${game.i18n.localize("gracefulalignment.size")}</div>
                                    <div style="flex: 1 0 ${secondW};"><input type="text" id="width" /></div>
                                    <div style="flex: 1 0 ${thirdW};"><input type="text" id="height" /></div>
                                </div>
                            </div>
                        `,
                        callback: (html) => {
                            return {
                                baseX: parseInt(html.find('#base-x').val()),
                                baseY: parseInt(html.find('#base-y').val()),
                                offsetX: parseInt(html.find('#offset-x').val()),
                                offsetY: parseInt(html.find('#offset-y').val()),
                                width: parseInt(html.find('#width').val()),
                                height: parseInt(html.find('#height').val())
                            };
                        }
                    });

                    let unsortedElements = [];
                    canvas.drawings.controlledObjects.forEach((value, key, map) => {
                        unsortedElements.push(value.document);
                    });

                    const sortedByXThenY = unsortedElements.sort((a, b) => {
                        if (a.x > b.x) return 1;
                        if (b.x > a.x) return -1;

                        if (a.y > b.y) return 1;
                        if (b.y > a.y) return -1;

                        return 0;
                    });
                    const sortedByYThenX = unsortedElements.sort((a, b) => {
                        if (a.y > b.y) return 1;
                        if (b.y > a.y) return -1;

                        if (a.x > b.x) return 1;
                        if (b.x > a.x) return -1;

                        return 0;
                    });

                    let updates = {};
                    unsortedElements.forEach((element) => {
                        updates[element._id] = {
                            _id: element._id
                        };
                    });

                    handleGeneric(myValue['baseX'], myValue['offsetX'], 'x', sortedByXThenY, updates);
                    handleGeneric(myValue['baseY'], myValue['offsetY'], 'y', sortedByYThenX, updates);

                    if (!isNaN(myValue['width'])) {
                        unsortedElements.forEach((element) => {
                            updates[element._id] = mergeObject(
                                updates[element._id],
                                {
                                    width: myValue['width']
                                }
                            );
                        });
                    }

                    if (!isNaN(myValue['height'])) {
                        unsortedElements.forEach((element) => {
                            updates[element._id] = mergeObject(
                                updates[element._id],
                                {
                                    height: myValue['height']
                                }
                            );
                        });
                    }

                    canvas.scene.updateEmbeddedDocuments('Drawing', Object.values(updates));
                });
            },
        };
        controls.find((c) => c.name == "drawings").tools.push(alignX);
    }
);
