import { IEvent } from "@/lib/database/models/event.model";
import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubText: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubText,
  limit,
  page,
  totalPages = 0,
  urlParamName,
  collectionType,
}: CollectionProps) => {
  return (
    <>
      {data?.length > 0 ? (
        // Event card and pagination
        <div className="flex flex-col items-center gap-10">
          {/* Events cards  */}
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data?.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              //  Owner events
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event?._id} className="flex justify-center">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center flex flex-col wrapper min-h-[200px] w-full rounded-[14px] gap-3 bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubText}</p>
        </div>
      )}
    </>
  );
};
export default Collection;
