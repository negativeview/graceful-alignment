Hooks.on(
    'getSceneControlButtons',
    (controls, b, c) => {
        let alignX = {
            name: "alignX",
            title: game.i18n.localize("gracefulalignment.name"),
            icon: "fas fa-arrow-right",
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
                                baseX: html.find('#base-x').val(),
                                baseY: html.find('#base-y').val(),
                                offsetX: html.find('#offset-x').val(),
                                offsetY: html.find('#offset-y').val(),
                                width: html.find('#width').val(),
                                height: html.find('#height').val()
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

                    if (!isNaN(parseInt(myValue['baseX']))) {
                        const baseX = parseInt(myValue['baseX']);
                        const offsetX = parseInt(myValue['offsetX']);

                        sortedByXThenY.forEach(
                            (element, idx) => {
                                updates[element._id] = mergeObject(
                                    updates[element._id],
                                    {
                                        x: baseX + (isNaN(offsetX) ? 0 : offsetX) * idx
                                    }
                                );
                            }
                        )
                    }

                    if (!isNaN(parseInt(myValue['baseY']))) {
                        const baseY = parseInt(myValue['baseY']);
                        const offsetY = parseInt(myValue['offsetY']);

                        sortedByYThenX.forEach(
                            (element, idx) => {
                                updates[element._id] = mergeObject(
                                    updates[element._id],
                                    {
                                        y: baseY + (isNaN(offsetY) ? 0 : offsetY) * idx
                                    }
                                );
                            }
                        )
                    }

                    if (!isNaN(parseInt(myValue['width']))) {
                        unsortedElements.forEach((element) => {
                            updates[element._id] = mergeObject(
                                updates[element._id],
                                {
                                    width: parseInt(myValue['width'])
                                }
                            );
                        });
                    }

                    if (!isNaN(parseInt(myValue['height']))) {
                        unsortedElements.forEach((element) => {
                            updates[element._id] = mergeObject(
                                updates[element._id],
                                {
                                    height: parseInt(myValue['height'])
                                }
                            );
                        });
                    }

                    console.log(updates);
                    canvas.scene.updateEmbeddedDocuments('Drawing', Object.values(updates));
                });
            },
        };
        controls.find((c) => c.name == "drawings").tools.push(alignX);
    }
);
