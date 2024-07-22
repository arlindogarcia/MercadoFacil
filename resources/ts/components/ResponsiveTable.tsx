import React, { ReactNode } from "react";

export type TableHeaders<T> = {
  label: string | React.Component | React.ReactFragment;
  render: (
    item: T,
    index: number
  ) => string | React.Component | React.ReactFragment | ReactNode;
  wrapped?: boolean;
  notClicable?: boolean;
  widthDesktop?: string;
};

export interface ResponsiveTableProps {
  headers: TableHeaders<any>[];
  data: Record<string, any>[];
  onClick?: (item: any) => void;
  tfoot?: ReactNode;
  thead?: React.Component | React.ReactFragment;
  isSmall?: boolean;
  selectedItems?: any;
  changeItems?: (item: any) => void;
  canSelect?: (item: any) => boolean;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  headers,
  data,
  tfoot,
  thead,
  onClick,
  selectedItems,
  changeItems,
  canSelect,
}) => {

  const isChecked = (item: any) => {
    return (selectedItems ?? []).some((i: any) => i.id == item.id);
  }

  const onChangeItem = (item: any, checked: boolean) => {
    const itens = JSON.parse(JSON.stringify(selectedItems));

    if (checked) {
      itens.push(item);
    } else {
      const itemIndex = itens.findIndex((i: any) => i.id == item.id);
      itens.splice(itemIndex, 1);
    }

    typeof changeItems === 'function' && changeItems(itens);
  }

  const isCheckedAll = () => {
    return (data ?? []).every((i) => {
      if (typeof canSelect === 'function' && !canSelect(i)) return true;

      return (selectedItems ?? []).some((j: any) => j.id == i.id);
    })
  }

  const onChangeAllItems = (checked: boolean) => {
    if (checked) {
      typeof changeItems === 'function' && changeItems(data.filter((i) => typeof canSelect === 'function' ? canSelect(i) : true));
      return;
    }

    typeof changeItems === 'function' && changeItems([]);
  }

  const isMobile = window.innerWidth < 768;

  const styleInMobileOrDesktop = (mobile: string, desktop: string) => {
    if (isMobile) return mobile;
    return desktop;
  }

  return (
    <table className="table w-full">
      <thead className={`text-xs text-gray-700 uppercase bg-gray-100 ${styleInMobileOrDesktop('hidden', 'table-header-group')}`}>
        <>
          <tr className="table-row w-full text-sm text-left rtl:text-right text-gray-500">
            {selectedItems && <th>
              <input type="checkbox" className="bg-white" onChange={(evt) => onChangeAllItems(evt.target.checked)} checked={isCheckedAll()} />
            </th>}
            {headers.map((header, i) => (
              <th className="px-2 py-3" key={`${i}`}>{header.label as string}</th>
            ))}
          </tr>
          {thead}
        </>
      </thead>
      <tbody>
        {!!data &&
          data.map((item, i) => (
            <tr key={`${i}`} className="hover:bg-gray-100 rounded hover:opacity-100 transition duration-200 ease-in-out bg-white border-b">
              {selectedItems && <td className={`cursor-default whitespace-nowrap ${styleInMobileOrDesktop('block', 'table-cell')}`}>
                <input type="checkbox" disabled={typeof canSelect === 'function' ? !canSelect(item) : false} className="bg-white" onChange={(evt) => onChangeItem(item, evt.target.checked)} checked={isChecked(item)} />
              </td>}

              {headers.map((header, j) =>
                header.wrapped ? (
                  <td
                    onClick={header.notClicable ? () => { } : () => typeof onClick === 'function' && onClick({
                      item,
                      index: i,
                    })}
                    key={`${j}`}
                    className={`${header.notClicable ? 'cursor-default' : 'cursor-pointer'} py-3 px-2 whitespace-nowrap ${header.widthDesktop ? header.widthDesktop : styleInMobileOrDesktop('', 'w-[1%]')} ${styleInMobileOrDesktop('block', 'table-cell')}`}
                  >
                    <>
                      <span className={`${styleInMobileOrDesktop('inline', 'hidden')} bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>
                        {header.label as string}
                      </span>
                      {header.render(item, i)}
                    </>
                  </td>
                ) : (
                  <td
                    onClick={header.notClicable ? () => { } : () => typeof onClick === 'function' && onClick({
                      item,
                      index: i,
                    })}
                    className={`py-3 px-2 ${header.widthDesktop ? header.widthDesktop : "100%"} ${header.notClicable ? 'cursor-default' : 'cursor-pointer'} ${styleInMobileOrDesktop('block', 'table-cell')}`}
                    key={`${j}`}
                  >
                    <>
                      <span className={`${styleInMobileOrDesktop('inline', 'hidden')} bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>
                        {header.label as string}
                      </span>
                      {header.render(item, i)}
                    </>
                  </td>
                )
              )}
            </tr>
          ))}
      </tbody>
      {!!tfoot && <tfoot>{tfoot}</tfoot>}
    </table>
  );
};

export default ResponsiveTable;
