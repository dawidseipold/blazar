import Card from "@/components/app/layout/card";
import { ArrowUpDown, ChevronRight, EllipsisVertical } from "lucide-react";

const WalletOverviewPage = () => {
  return (
    // PAGE IS WORK IN PROGRESS
    <div className="flex flex-col gap-y-6 p-8">
      {/* <TopBar /> */}
      <div className="grid grid-cols-2 gap-x-6">
        <Card.Root>
          <Card.Content>
            <Card.Header title="Your Wallet">
              <ChevronRight />
            </Card.Header>

            <div>
              <p className="text-3xl font-semibold">$2532.60</p>

              <span className="text-xs">
                <b className="text-success">+25%</b> from last month
              </span>
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Content>
            <Card.Header title="All Expenses">
              <ChevronRight />
            </Card.Header>

            <div className="flex flex-col gap-y-4">
              <div className="grid grid-cols-3 gap-x-4">
                <div className="flex flex-col gap-y-2">
                  <span className="text-neutral">Today</span>
                  <b>$475.53</b>
                </div>

                <div className="flex flex-col gap-y-2">
                  <span className="text-neutral">This week</span>
                  <b>$3,151.72</b>
                </div>

                <div className="flex flex-col gap-y-2">
                  <span className="text-neutral">This month</span>
                  <b>$12,421.23</b>
                </div>
              </div>

              <div className="flex gap-x-8 items-center">
                {/* Pie Chart */}
                <div className="w-32 h-32 rounded-full bg-accent " />

                {/* Displays top categories */}
                <ol className="flex flex-col gap-y-2">
                  <li>Shopping</li>
                  <li>Workspace</li>
                  <li>Platform</li>
                  <li>Education</li>
                </ol>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <Card.Root>
        <Card.Content>
          <Card.Header title="Wallet history">
            {/* TABS */}
            <div className="bg-base-100 p-1 rounded-xl flex gap-x-1">
              <div className="btn bg-base-300 btn-sm">1 Day</div>
              <div className="btn btn-ghost btn-sm">1 Week</div>
              <div className="btn btn-ghost btn-sm">1 Month</div>
              <div className="btn btn-ghost btn-sm">1 Year</div>
            </div>
          </Card.Header>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Content>
          <Card.Header title="Recent Transactions">
            <ChevronRight />
          </Card.Header>

          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="flex gap-x-2 items-center">
                    Name <ArrowUpDown size={8} />
                  </div>
                </th>
                <th>
                  <div className="flex gap-x-2 items-center">
                    Date <ArrowUpDown size={8} />
                  </div>
                </th>
                <th>
                  <div className="flex gap-x-2 items-center">
                    Status <ArrowUpDown size={8} />
                  </div>
                </th>
                <th>
                  <div className="flex gap-x-2 items-center">
                    Amount <ArrowUpDown size={8} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex gap-x-2 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-neutral" />
                    <div className="flex flex-col gap-y-1">
                      <b>Spotify</b>
                      <span>Monthly Subsciption</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span>5 days ago</span>
                </td>

                <td>
                  <span className="badge badge-success">Completed</span>
                </td>

                <td>
                  <b className="text-success">+$48.22</b>
                </td>

                <td>
                  <EllipsisVertical />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex gap-x-2 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-neutral" />
                    <div className="flex flex-col gap-y-1">
                      <b>Walmart</b>
                      <span>Grocery</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span>6 days ago</span>
                </td>

                <td>
                  <span className="badge badge-warning">In Progress</span>
                </td>

                <td>
                  <b className="text-error">-$248.22</b>
                </td>

                <td>
                  <EllipsisVertical />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex gap-x-2 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-neutral" />
                    <div className="flex flex-col gap-y-1">
                      <b>Polimer Pro</b>
                      <span>Salary</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span>6 days ago</span>
                </td>

                <td>
                  <span className="badge badge-success">Completed</span>
                </td>

                <td>
                  <b className="text-success">+$2134.12</b>
                </td>

                <td>
                  <EllipsisVertical />
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Content>
      </Card.Root>
    </div>
  );
};

export default WalletOverviewPage;
