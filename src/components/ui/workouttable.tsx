import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


const WorkoutTable = () => {
  return (
    <Table className="">
      <TableCaption>Previous Workouts</TableCaption>
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[100px] text-white hover:bg-transparent">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-primary/50 data-[state=selected]:bg-muted">
          <TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>August 24th, 2023</AccordionTrigger>
                <AccordionContent>
                  <p>You dont 15 exercises</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-primary/50 data-[state=selected]:bg-muted">
          <TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>August 24th, 2023</AccordionTrigger>
                <AccordionContent>
                  <p>You dont 15 exercises</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-primary/50 data-[state=selected]:bg-muted">
          <TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>August 24th, 2023</AccordionTrigger>
                <AccordionContent>
                  <p>You dont 15 exercises</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-primary/50 data-[state=selected]:bg-muted">
          <TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>August 24th, 2023</AccordionTrigger>
                <AccordionContent>
                  <p>You dont 15 exercises</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-primary/50 data-[state=selected]:bg-muted">
          <TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>August 24th, 2023</AccordionTrigger>
                <AccordionContent>
                  <p>You dont 15 exercises</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-primary/50 data-[state=selected]:bg-muted">
          <TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>August 24th, 2023</AccordionTrigger>
                <AccordionContent>
                  <p>You dont 15 exercises</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-primary/50 data-[state=selected]:bg-muted">
          <TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>August 24th, 2023</AccordionTrigger>
                <AccordionContent>
                  <p>You dont 15 exercises</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>    
  )
}

export default WorkoutTable