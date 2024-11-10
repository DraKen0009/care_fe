import { useEffect, useState } from "react";
import { navigate } from "raviger";
import routes from "@/Redux/api";
import useQuery from "@/Utils/request/useQuery";
import request from "@/Utils/request/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Common/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CareIcon from "@/CAREUI/icons/CareIcon";

interface Props {
  slug: string;
}

export function PlugConfigEdit({ slug }: Props) {
  const isNew = slug === "new";
  const { data: existingConfig, loading } = useQuery(
    routes.plugConfig.getPlugConfig,
    { pathParams: { slug }, prefetch: !isNew },
  );

  const [config, setConfig] = useState({
    slug: "",
    meta: `{}`,
  });

  useEffect(() => {
    if (existingConfig) {
      setConfig({
        slug: existingConfig.slug,
        meta: JSON.stringify(existingConfig.meta, null, 2),
      });
    }
  }, [existingConfig]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        await request(routes.plugConfig.createPlugConfig, {
          body: config,
        });
      } else {
        await request(routes.plugConfig.updatePlugConfig, {
          pathParams: { slug },
          body: config,
        });
      }
      navigate("/apps/plug-configs");
    } catch (error) {
      console.error("Error saving config:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await request(routes.plugConfig.deletePlugConfig, {
        pathParams: { slug },
      });
      navigate("/apps");
    } catch (error) {
      console.error("Error deleting config:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isNew ? "Create New Config" : "Edit Config"}
        </h1>
        {!isNew && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <CareIcon icon="l-trash-alt" className="mr-2" />
                Delete Config
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the config "{config.slug}". This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Slug</label>
          <Input
            value={config.slug}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                slug: e.target.value,
              }))
            }
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Meta (JSON)</label>
          <Textarea
            value={config.meta}
            onChange={(e) => {
              const meta = e.target.value;
              setConfig((prev) => ({ ...prev, meta }));
            }}
            rows={10}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/apps/plug-configs")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
