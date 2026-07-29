import { TeachersTableView, type TeachersTableViewProps } from "./teachers-table/components/TeachersTableView";

export type TeachersTableProps = TeachersTableViewProps;

export default function TeachersTable(props: TeachersTableProps) {
  return <TeachersTableView {...props} />;
}
