import { useQuery } from "@tanstack/vue-query";
import { VueQueryKey } from "app/utils/vue-query-keys";

export default function () {
  return useQuery({
    queryKey: [VueQueryKey.remoteConfig],
    queryFn: async (): Promise<RemoteConfig> => {
      const res = await fetch(
        "https://remote-config.anime-skip.com/api/config/anime-skip.com",
      );
      if (!res.ok) {
        throw new Error(
          "Something went wrong: " + ((await res.text()) || "Unknown"),
        );
      }
      return await res.json();
    },
    initialData: {
      services: [
        {
          background: "#F37521",
          name: "Crunchyroll",
          supported: true,
          textColor: "#FFFFFF",
          url: "https://crunchyroll.com",
        },
      ],
    },
  });
}

export type RemoteConfigService = {
  background: string;
  name: string;
  textColor: string;
  supported: boolean;
  url: string;
};

export type RemoteConfig = {
  services: RemoteConfigService[];
};
