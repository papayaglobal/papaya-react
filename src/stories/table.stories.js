import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { orderBy, times, map, random } from "lodash";
import { inspect } from "util";

import "./stories.css";
import Table from "../Common/Table";

export const actions = {
    onClick: action("onClick")
};

const getExpandContent = row => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(<div>Lazy Expand Content row: {inspect(row)}</div>);
        }, 2500);
    });
};

const defaultSideMenu = [
    {
        name: "View Profile",
        action: context => {
            console.log(context, "Viewing profile...");
        }
    },
    {
        name: "Edit",
        action: context => {
            console.log(context, "Editing...");
        }
    },
    {
        name: "Re-Invite",
        action: context => console.log(context, "Re-inviting...")
    },
    {
        name: "Suspend User",
        action: context => console.log(context, "Suspending...")
    },
    {
        name: "Block User",
        action: context => console.log(context, "Blocking...")
    },
    {
        name: "Send Change Pasword",
        action: context => console.log(context, "Change pass...")
    }
];

function tablenameInput(name, email) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{name}</div>
            <div>{email}</div>
        </div>
    );
}

const columns = [
    { colId: "type", output: "Type", flex: 1, notSortable: true },
    { colId: "id", output: "ID", flex: 1 },
    {
        colId: "nameAndEmailOutput",
        output: "Name",
        flex: 2,
        sortMethod: (data, sortOrder) => sortNameColumnBy(data, sortOrder)
    },
    { colId: "org", output: "Org", flex: 2 },
    { colId: "projects", output: "Projects", flex: 1 },
    { colId: "status", output: "Status", flex: 0.5 }
];

const data = [
    {
        isSelected: true,
        expandContentLazy: getExpandContent,
        type: "P",
        id: 5532,
        name: "Frank Boehm",
        nameAndEmailOutput: tablenameInput("Frank Boehm", "popo@gmail.com"),
        org: "Blue Eagle",
        projects: 3,
        status: "Active",
        sideMenuContent: [
            {
                name: "Avi",
                action: () => console.log("my own action!")
            },
            {
                name: "Itay",
                action: context =>
                    console.log("we use the row context!", context)
            }
        ]
    },
    {
        isSelected: false,
        expandContent: (
            <div>
                Expand Content 2
                <div>
                    hello
                    <div>
                        popo
                        <div>
                            momo
                            <div>
                                lolo
                                <div>
                                    dodo
                                    <div>
                                        gogo<div>soso</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        type: "S",
        id: 5531,
        name: "Ivan Morais",
        nameAndEmailOutput: tablenameInput("Ivan Morais", "popo@gmail.com"),
        org: "Mango",
        projects: 15,
        status: "Active"
    },
    {
        isSelected: false,
        expandContent: (
            <div>
                Expand Content 2
                <div>
                    hello
                    <div>
                        popo
                        <div>
                            momo
                            <div>
                                lolo
                                <div>
                                    dodo
                                    <div>
                                        gogo<div>soso</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        type: "S",
        id: 5531,
        name: "Ivan Morais",
        nameAndEmailOutput: tablenameInput("Ivan Morais", "popo@gmail.com"),
        org: "Mango",
        projects: 15,
        status: "Active"
    },
    {
        isSelected: false,
        expandContent: (
            <div>
                Expand Content 2
                <div>
                    hello
                    <div>
                        popo
                        <div>
                            momo
                            <div>
                                lolo
                                <div>
                                    dodo
                                    <div>
                                        gogo<div>soso</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        type: "S",
        id: 5531,
        name: "Ivan Morais",
        nameAndEmailOutput: tablenameInput("Ivan Morais", "popo@gmail.com"),
        org: "Mango",
        projects: 15,
        status: "Active"
    },
    {
        isSelected: false,
        expandContent: (
            <div>
                Expand Content 2
                <div>
                    hello
                    <div>
                        popo
                        <div>
                            momo
                            <div>
                                lolo
                                <div>
                                    dodo
                                    <div>
                                        gogo<div>soso</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        type: "S",
        id: 5531,
        name: "Ivan Morais",
        nameAndEmailOutput: tablenameInput("Ivan Morais", "popo@gmail.com"),
        org: "Mango",
        projects: 15,
        status: "Active"
    },
    {
        isSelected: false,
        expandContent: (
            <div>
                Expand Content 2
                <div>
                    hello
                    <div>
                        popo
                        <div>
                            momo
                            <div>
                                lolo
                                <div>
                                    dodo
                                    <div>
                                        gogo<div>soso</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        type: "S",
        id: 5531,
        name: "Ivan Morais",
        nameAndEmailOutput: tablenameInput("Ivan Morais", "popo@gmail.com"),
        org: "Mango",
        projects: 15,
        status: "Active"
    },
    {
        isSelected: false,
        expandContent: (
            <div>
                Expand Content 2
                <div>
                    hello
                    <div>
                        popo
                        <div>
                            momo
                            <div>
                                lolo
                                <div>
                                    dodo
                                    <div>
                                        gogo<div>soso</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        type: "S",
        id: 5531,
        name: "Ivan Morais",
        nameAndEmailOutput: tablenameInput("Ivan Morais", "popo@gmail.com"),
        org: "Mango",
        projects: 15,
        status: "Active"
    },
    {
        isSelected: false,
        expandContent: <div>Expand Content 3</div>,
        type: "P",
        id: 5533,
        name: "Dominik Doudny",
        nameAndEmailOutput: tablenameInput("Dominik Doudny", "popo@gmail.com"),
        org: "Facebook",
        projects: 6,
        status: "Active"
    },
    {
        isSelected: false,
        expandContent: <div>Expand Content 4</div>,
        type: "P",
        id: 5534,
        name: "Mike Adams",
        nameAndEmailOutput: tablenameInput("Mike Adams", "popo@gmail.com"),
        org: "CyberArk",
        projects: 6,
        status: "Active"
    },
    ...times(101, () => {
        return {
            isSelected: false,
            expandContentLazy: getExpandContent,
            type: "P",
            id: 5534,
            name: "Mike Adams",
            nameAndEmailOutput: tablenameInput("Mike Adams", "popo@gmail.com"),
            org: "CyberArk",
            projects: 6,
            status: "Active"
        };
    })
];

const rowCountOptions = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" }
];

function log(x) {
    console.log("sleceted", x);
}

function sortNameColumnBy(data, sortOrder) {
    return orderBy(data, "name", sortOrder);
}

storiesOf("Table", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <div className='app' style={{ width: "-webkit-fill-available" }}>
            <Table
                columns={columns}
                data={data}
                onSelected={log}
                expandable
                lazyExpand={getExpandContent}
                sideMenu
                defaultSideMenu={defaultSideMenu}
                rowCountDefault={2}
                rowCountOptions={rowCountOptions}
            ></Table>
        </div>
    ))
    .add("LazyLoad", () => {
        const loadData = event => {
            if (event.sortColumnId) {
                let orderedData = [];
                if (event.sortColumnId === "nameAndEmailOutput") {
                    orderedData = orderBy(data, "name", event.sortColumnOrder);
                } else {
                    orderedData = orderBy(
                        data,
                        event.sortColumnId,
                        event.sortColumnOrder
                    );
                }

                return orderedData.slice(
                    event.first,
                    event.rowCount + event.first
                );
            }
            return data.slice(event.first, event.rowCount + event.first);
        };
        return (
            <div className='app' style={{ width: "-webkit-fill-available" }}>
                <Table
                    columns={columns}
                    data={data.slice(0, 2)}
                    onSelected={log}
                    expandable
                    lazyExpand={getExpandContent}
                    sideMenu
                    defaultSideMenu={defaultSideMenu}
                    rowCountDefault={2}
                    rowCountOptions={rowCountOptions}
                    onLazyLoad={loadData}
                    totalRows={data.length}
                ></Table>
            </div>
        );
    })
    .add("Sample", () => {
        const columns = [
            { colId: "id", output: "Id", flex: 1 },
            { colId: "name", output: "Name", flex: 2 },
            {
                colId: "startedAt",
                output: "Date",
                flex: 3,
                sortMethod: (data, sortOrder) =>
                    orderBy(data, "date.createdAt", sortOrder)
            }
        ];

        const serverData = times(2000, i => {
            return {
                id: i + 1,
                name: `${Math.random() > 0.5 ? "A" : "B"}${
                    Math.random() > 0.5 ? "c" : "d"
                }${Math.random() > 0.5 ? "e" : "f"}`,
                date: {
                    createdAt: new Date(`200${random(0, 9)}`),
                    updatedAt: new Date()
                }
            };
        });

        const data = map(serverData, item => {
            return {
                ...item,
                startedAt: <div>{item.date.createdAt.toString()}</div>,
                isSelected: false
            };
        });

        return (
            <div className='app' style={{ width: "-webkit-fill-available" }}>
                <Table
                    columns={columns}
                    data={data}
                    expandable
                    lazyExpand={getExpandContent}
                    sideMenu
                    defaultSideMenu={defaultSideMenu}
                    rowCountDefault={50}
                    rowCountOptions={[
                        { value: 25, label: "25" },
                        { value: 50, label: "50" },
                        { value: 100, label: "100" }
                    ]}
                />
            </div>
        );
    });
