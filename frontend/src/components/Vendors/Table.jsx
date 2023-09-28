import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Table, UnstyledButton, Group, Text, Center, TextInput, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { PaginationTable } from "./Pagination";
import request from "../../utils/request";
import axios from 'axios';
import CreateVendor from './CreateVendor'
import EditVendor from './EditVendor'
import DeleteVendor from './DeleteVendor'
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
    const [vendorId, setVendorId] = useState('');

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
            const response = await axios.get(`${request.defaults.baseURL}Vendor`);
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
        filteredRows.map((row, index) => (
            <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.email}</td>
                <td>{row.sparePartsHeoffers}</td>
                <td>
                    <i className="fa-regular fa-pen-to-square text-success fs-4 icon-cursor me-2" data-bs-toggle="modal"
                        onClick={() => setVendorId(row._id)} data-bs-target="#EditVendor"></i>
                    <i className="fa-regular fa-trash-can text-danger fs-4 icon-cursor" data-bs-toggle="modal"
                        onClick={() => setVendorId(row._id)} data-bs-target="#DeleteVendors"></i>
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
            <CreateVendor adminInfo={adminInfo} fetchData={fetchData} />
            <EditVendor adminInfo={adminInfo} fetchData={fetchData} vendorId={vendorId} />
            <DeleteVendor adminInfo={adminInfo} fetchData={fetchData} vendorId={vendorId} />

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
                <Table horizontalSpacing="md" verticalSpacing="md" miw={1000} >
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <Th
                                sorted={sortColumn === 'assetNo'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetNo')}
                            >
                                Name
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetName'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetName')}
                            >
                                Phone
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetType'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetType')}
                            >
                                Email
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetStatus'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('spareparts')}
                            >
                                The name of the spare parts he offers
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
