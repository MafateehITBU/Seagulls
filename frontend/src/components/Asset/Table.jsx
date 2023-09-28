import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Table, UnstyledButton, Group, Text, Center, TextInput, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { PaginationTable } from "./Pagination";
import request from "../../utils/request";
import axios from 'axios';
import CreateAsset from './CreateAsset'
import MaintenanceReport from './MaintenanceReport'
import EditAsset from './EditAsset'
import DeleteAsset from './DeleteAsset'
import { AdminInfoContext } from '../../context/AdminInfoContext'

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },


    control: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: rem(21),
        height: rem(21),
        borderRadius: rem(21),
    },
}));

export function TableSort() {
    const { adminInfo, setAdminInfo, selectBigItem } = useContext(AdminInfoContext)
    const [searchText, setSearchText] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [secondSortColumn, setSecondSortColumn] = useState(null);
    const [secondSortOrder, setSecondSortOrder] = useState('asc');
    const [assetId, setAssetId] = useState('');

    function Th({ children, reversed, sorted, onSort }) {
        const { classes } = useStyles();
        const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
        return (
            <th className={classes.th}>
                <UnstyledButton onClick={onSort} className={classes.control}>
                    <Group position="apart">
                        <Text fw={500} fz="sm">
                            {children}
                        </Text>
                        <Center className={classes.icon}>
                            <Icon size="0.9rem" stroke={1.5} />
                        </Center>
                    </Group>
                </UnstyledButton>
            </th>
        );
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}Asset`);
            const reversedData = response.data.reverse();
            setSortedData(reversedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //To make search results always at the top
    const filteredData = sortedData.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = selectBigItem;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredData.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    // Sort according to the letters
    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    // Sort according to the letters
    const handleSecondSort = (column) => {
        if (column === secondSortColumn) {
            setSecondSortOrder(secondSortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSecondSortColumn(column);
            setSecondSortOrder('asc');
        }
    };

    const sortedRecords = [...records];
    if (sortColumn) {
        sortedRecords.sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];
            if (sortOrder === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });
    }

    if (sortColumn) {
        sortedRecords.sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];
            if (sortOrder === 'asc') {
                const priorityMap = {
                    Low: 1,
                    Medium: 2,
                    High: 3,
                };
                return priorityMap[valueA] - priorityMap[valueB];
            } else {
                const priorityMap = {
                    Low: 1,
                    Medium: 2,
                    High: 3,
                };
                return priorityMap[valueB] - priorityMap[valueA];
            }
        });
    }

    //View the data in addition to making all forms of the filter
    const filteredRows = sortedRecords.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const showTable = filteredRows.length > 0 ? (
        filteredRows.map((row) => (
            <tr key={row._id}>
                <td>{row.assetNo}</td>
                <td>{row.assetName}</td>
                <td>{row.assetType}</td>
                <td>{row.assetSubType}</td>
                <td>{row.assetStatus}</td>
                <td><a href={row.assetImage.url} target='_blank'>Asset Image</a></td>
                <td>{row.assetLocation}</td>
                <td>{row.instalationData}</td>
                <td>{row.quantity}</td>
                {/* <td>{row.Coordinates}</td> */}
                <td >
                    <i className="fa-regular fa-file-lines fs-4 icon-cursor me-2" style={{ color: '#228be6' }}
                        onClick={() => setAssetId(row._id)} data-bs-toggle="modal" data-bs-target="#MaintenanceReport"></i>
                </td>
                <td>
                    <i className="fa-regular fa-pen-to-square text-success fs-4 icon-cursor me-2" data-bs-toggle="modal"
                        onClick={() => setAssetId(row._id)} data-bs-target="#EditAsset"></i>
                    <i className="fa-regular fa-trash-can text-danger fs-4 icon-cursor" data-bs-toggle="modal"
                        onClick={() => setAssetId(row._id)} data-bs-target="#DeleteSpareParts"></i>
                </td>

            </tr >
        ))
    ) : (
        <tr>
            <td colSpan="16">No records found</td>
        </tr>
    )

    return (
        <>
            <CreateAsset adminInfo={adminInfo} fetchData={fetchData} assetId={assetId} />
            <MaintenanceReport assetId={assetId} />
            <EditAsset adminInfo={adminInfo} fetchData={fetchData} assetId={assetId} />
            <DeleteAsset adminInfo={adminInfo} fetchData={fetchData} assetId={assetId} />

            <div className="form-outline">
                <input
                    type="search"
                    id="form1"
                    className="form-control"
                    placeholder="Search . . "
                    aria-label="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>

            <div className="d-flex justify-content-end mt-3 mb-3">
                <PaginationTable pageNmbers={numbers} setCurrentPage={setCurrentPage} />
            </div>
            <div className='Table-scroll'>
                <Table horizontalSpacing="md" verticalSpacing="md" miw={2000} >
                    <thead>
                        <tr>
                            <Th
                                sorted={sortColumn === 'assetNo'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetNo')}
                            >
                                Asset No
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetName'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetName')}
                            >
                                Asset Name
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetType'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetType')}
                            >
                                Asset Type
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetSubType'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetSubType')}
                            >
                                Asset Sub Type
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetStatus'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('spareparts')}
                            >
                                Asset Status
                            </Th>
                            <Th>
                                Asset Image
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetLocation'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetLocation')}
                            >
                                Asset Location
                            </Th>

                            <Th
                                sorted={sortColumn === 'instalationData'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('instalationData')}
                            >
                                Instalation Data
                            </Th>
                            <Th
                                sorted={sortColumn === 'quantity'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('quantity')}
                            >
                                Quantity
                            </Th>
                            {/* <Th
                                sorted={sortColumn === 'Coordinates'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('Coordinates')}
                            >
                                Coordinates
                            </Th> */}
                            <Th>
                                Maintenance Report
                            </Th>
                            <Th>
                                Modification
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        {showTable}
                    </tbody>
                </Table>
            </div >
        </>
    );
}
