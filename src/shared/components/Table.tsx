import { styled } from "@mui/material/styles";
import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function Table<T>({ data }: { data: T[] }) {
  return (
    <TableContainer component={Paper}>
      <MUITable sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.keys(data?.[0] || {}).map((name, idx) => (
              <StyledTableCell
                key={name + idx}
                align={idx === 0 ? "center" : "right"}
              >
                {name}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((_, idx) => (
            <StyledTableRow key={idx}>
              {Object.values(data?.[idx] || {}).map((value, jdx) => (
                <StyledTableCell
                  key={idx + jdx}
                  align={jdx === 0 ? "center" : "right"}
                  component="th"
                  scope="row"
                >
                  {value as string}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
}
