import { useMemo, useState } from 'react';
import {
    type MRT_ColumnDef,
    MaterialReactTable,
} from '../../src';
import { useMaterialReactTable } from '../../src/hooks/useMaterialReactTable';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
    title: 'Fixed Bugs / Manual Filtering',
};

export default meta;

interface Person {
    address: string;
    age: number;
    firstName: string;
    gender: string;
    lastName: string;
    phoneNumber: string;
    state: string;
}

const data: Person[] = [...Array(100)].map(() => ({
    address: faker.location.streetAddress(),
    age: faker.number.int(100),
    firstName: faker.person.firstName(),
    gender: Math.random() < 0.9 ? faker.person.sex() : faker.person.gender(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    state: faker.location.state(),
})).concat([{
    address: faker.location.streetAddress(),
    age: faker.number.int(100),
    firstName: faker.person.firstName(),
    gender: Math.random() < 0.9 ? faker.person.sex() : faker.person.gender(),
    lastName: "Abcdef",
    phoneNumber: faker.phone.number(),
    state: faker.location.state(),
}]);

export function ControlledGlobalFilter() {
    const [globalFilter, setGlobalFilter] = useState("Abc");

    const columns: MRT_ColumnDef<Person>[] = useMemo(() => [
        {
            accessorKey: 'firstName',
            header: 'First Name',
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
        },
        {
            accessorKey: 'address',
            header: 'Address',
        },
        {
            accessorKey: 'state',
            header: 'State',
        },
        {
            accessorKey: 'phoneNumber',
            header: 'Phone Number',
        },
    ], []);

    const table = useMaterialReactTable({
        columns: columns,
        data: data,
        state: {
            globalFilter: globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter
    });

    return (
        <MaterialReactTable
            table={table}
        />
    );
};
